import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";
import {
  BusinessType, DomainKind, DomainStatus, ProjectStatus, ProvisionStepName, ProvisionStepStatus,
} from "@nexora/database";
import { randomBytes } from "crypto";

/**
 * Idempotent project provisioning. Each step is checkpointed in `provision_steps`.
 * Re-running the worker after a crash is safe — finished steps are skipped.
 */
@Injectable()
export class ProvisionService {
  private readonly log = new Logger(ProvisionService.name);
  private readonly rootDomain = process.env.ROOT_DOMAIN ?? "nexora.app";

  constructor(private readonly prisma: PrismaService) {}

  async run(projectId: string, tenantId: string, notify: (step: ProvisionStepName, status: ProvisionStepStatus) => void) {
    await this.prisma.project.update({ where: { id: projectId }, data: { status: ProjectStatus.PROVISIONING } });

    const steps: { name: ProvisionStepName; fn: () => Promise<void> }[] = [
      { name: "TENANT_ENSURE",       fn: () => this.tenantEnsure(tenantId) },
      { name: "SCHEMA_SEED",         fn: () => this.schemaSeed(projectId, tenantId) },
      { name: "SITE_GENERATE",       fn: () => this.siteGenerate(projectId, tenantId) },
      { name: "ADMIN_GENERATE",      fn: () => this.adminGenerate(projectId) },
      { name: "MOBILE_CONFIG",       fn: () => this.mobileConfig(projectId, tenantId) },
      { name: "CRM_BOOTSTRAP",       fn: () => this.crmBootstrap(projectId, tenantId) },
      { name: "DOMAIN_PROVISION",    fn: () => this.domainProvision(projectId, tenantId) },
      { name: "TLS_ISSUE",           fn: () => this.tlsIssue(projectId) },
      { name: "CDN_PUBLISH",         fn: () => this.cdnPublish(projectId) },
      { name: "MONITORING_ACTIVATE", fn: () => this.monitoringActivate(projectId, tenantId) },
    ];

    for (const step of steps) {
      const record = await this.prisma.provisionStep.findUnique({
        where: { projectId_name: { projectId, name: step.name } },
      });
      if (record?.status === ProvisionStepStatus.SUCCEEDED) {
        notify(step.name, ProvisionStepStatus.SUCCEEDED);
        continue;
      }
      await this.prisma.provisionStep.update({
        where: { projectId_name: { projectId, name: step.name } },
        data: { status: ProvisionStepStatus.RUNNING, startedAt: new Date(), attempts: { increment: 1 } },
      });
      notify(step.name, ProvisionStepStatus.RUNNING);
      try {
        await step.fn();
        await this.prisma.provisionStep.update({
          where: { projectId_name: { projectId, name: step.name } },
          data: { status: ProvisionStepStatus.SUCCEEDED, finishedAt: new Date() },
        });
        notify(step.name, ProvisionStepStatus.SUCCEEDED);
      } catch (e: any) {
        this.log.error({ err: e, step: step.name, projectId }, "Provision step failed");
        await this.prisma.provisionStep.update({
          where: { projectId_name: { projectId, name: step.name } },
          data: { status: ProvisionStepStatus.FAILED, error: e.message?.slice(0, 500), finishedAt: new Date() },
        });
        notify(step.name, ProvisionStepStatus.FAILED);
        await this.prisma.project.update({
          where: { id: projectId },
          data: { status: ProjectStatus.FAILED, failureReason: `${step.name}: ${e.message}` },
        });
        throw e;
      }
    }

    await this.prisma.project.update({
      where: { id: projectId },
      data: { status: ProjectStatus.ACTIVE, publishedAt: new Date(), failureReason: null },
    });
  }

  // ── Steps ──────────────────────────────────────────────────────────────────

  private async tenantEnsure(tenantId: string) {
    await this.prisma.tenant.findUniqueOrThrow({ where: { id: tenantId } });
  }

  private async schemaSeed(projectId: string, tenantId: string) {
    const project = await this.prisma.project.findUniqueOrThrow({ where: { id: projectId } });
    const seed = STARTER_PAGES[project.businessType];
    await this.prisma.page.createMany({
      data: seed.map((p) => ({
        tenantId, projectId, slug: p.slug, title: p.title, description: p.description,
        blocks: p.blocks as any, metaJson: { title: p.title, description: p.description } as any,
      })),
      skipDuplicates: true,
    });
  }

  private async siteGenerate(projectId: string, _tenantId: string) {
    // Web app reads pages at request time (SSR); nothing to bake here in dev.
    // NEXORA: TODO — when we add static export, kick off an ISR revalidation here.
    await this.simulateWork(200);
    await this.prisma.project.update({ where: { id: projectId }, data: { config: { siteVersion: 1 } as any } });
  }

  private async adminGenerate(_projectId: string) { await this.simulateWork(100); }

  private async mobileConfig(projectId: string, tenantId: string) {
    const project = await this.prisma.project.findUniqueOrThrow({ where: { id: projectId } });
    await this.prisma.mobileConfig.upsert({
      where: { projectId },
      update: {},
      create: {
        tenantId, projectId,
        appName: project.name,
        bundleId: `app.nexora.${project.slug.replace(/-/g, "")}`,
        themeJson: { primary: project.brandColor, mode: "system" } as any,
        iconUrl: project.logoUrl ?? undefined,
        features: defaultMobileFeatures(project.businessType) as any,
      },
    });
  }

  private async crmBootstrap(projectId: string, tenantId: string) {
    const project = await this.prisma.project.findUniqueOrThrow({ where: { id: projectId } });
    await this.prisma.crmPipeline.create({
      data: {
        tenantId,
        name: `${project.name} sales`,
        stages: defaultPipeline(project.businessType) as any,
      },
    });
  }

  private async domainProvision(projectId: string, tenantId: string) {
    const project = await this.prisma.project.findUniqueOrThrow({ where: { id: projectId } });
    const hostname = `${project.slug}.${this.rootDomain}`;
    await this.prisma.domain.upsert({
      where: { hostname },
      update: { status: DomainStatus.ACTIVE, verifiedAt: new Date(), isPrimary: true, projectId },
      create: {
        tenantId, projectId, hostname, kind: DomainKind.SUBDOMAIN,
        status: DomainStatus.ACTIVE, verifiedAt: new Date(), isPrimary: true,
      },
    });
  }

  private async tlsIssue(projectId: string) {
    // Wildcard cert for *.nexora.app is already live; nothing to do for subdomain.
    // For custom domains DomainService kicks off cert-manager Certificate creation.
    const domains = await this.prisma.domain.findMany({
      where: { projectId, kind: DomainKind.SUBDOMAIN },
      select: { id: true },
    });
    if (domains.length) {
      await this.prisma.domain.updateMany({
        where: { id: { in: domains.map((d) => d.id) } },
        data: { tlsIssuedAt: new Date(), tlsExpiresAt: new Date(Date.now() + 90 * 86400_000) },
      });
    }
  }

  private async cdnPublish(_projectId: string) {
    // NEXORA: TODO call Cloudflare cache purge for the subdomain.
    await this.simulateWork(150);
  }

  private async monitoringActivate(projectId: string, tenantId: string) {
    // NEXORA: TODO register tenant+project in Prometheus SD JSON file (configmap).
    await this.simulateWork(100);
    this.log.log({ projectId, tenantId }, "monitoring activated");
  }

  private simulateWork(ms: number) { return new Promise((r) => setTimeout(r, ms)); }
}

// ─── Business-type seed data ───────────────────────────────────────────────────

function defaultMobileFeatures(bt: BusinessType) {
  const base = { push: true, auth: true, profile: true };
  switch (bt) {
    case "ECOMMERCE": return { ...base, cart: true, orders: true, payments: true };
    case "RESTAURANT": return { ...base, menu: true, ordering: true, reservations: true };
    case "BEAUTY_SALON":
    case "MEDICAL_CLINIC":
    case "BOOKING": return { ...base, booking: true, services: true };
    case "DELIVERY": return { ...base, tracking: true, orders: true };
    default: return base;
  }
}

function defaultPipeline(bt: BusinessType): { id: string; name: string }[] {
  if (bt === "LAW_FIRM") return ["Intake", "Consultation", "Engaged", "Won", "Lost"].map((n) => ({ id: n.toLowerCase(), name: n }));
  if (bt === "REAL_ESTATE") return ["Lead", "Viewing", "Offer", "Closing", "Closed"].map((n) => ({ id: n.toLowerCase(), name: n }));
  return ["New", "Contacted", "Qualified", "Won", "Lost"].map((n) => ({ id: n.toLowerCase(), name: n }));
}

const STARTER_PAGES: Record<BusinessType, Array<{ slug: string; title: string; description: string; blocks: unknown[] }>> = {
  ECOMMERCE: [
    { slug: "/", title: "Welcome", description: "Shop the collection", blocks: hero("Shop", "Find what you love"), },
    { slug: "/about", title: "About", description: "About our store", blocks: simpleText("About us"), },
  ],
  RESTAURANT: [
    { slug: "/", title: "Home", description: "Reserve your table", blocks: hero("Bon appétit", "Open daily 12–23"), },
    { slug: "/menu", title: "Menu", description: "Our menu", blocks: simpleText("Menu"), },
  ],
  BEAUTY_SALON:   [{ slug: "/", title: "Home", description: "Book a treatment", blocks: hero("Look great", "Book today") }],
  MEDICAL_CLINIC: [{ slug: "/", title: "Home", description: "Care that matters", blocks: hero("Care", "Book a visit") }],
  LAW_FIRM:       [{ slug: "/", title: "Home", description: "Counsel you can trust", blocks: hero("Counsel", "Get in touch") }],
  REAL_ESTATE:    [{ slug: "/", title: "Home", description: "Find your home", blocks: hero("Find your home", "Search listings") }],
  DELIVERY:       [{ slug: "/", title: "Home", description: "Fast delivery", blocks: hero("Delivered", "On your doorstep") }],
  SAAS_CRM:       [{ slug: "/", title: "Home", description: "CRM that ships", blocks: hero("Sell more", "Start free") }],
  ONLINE_SCHOOL:  [{ slug: "/", title: "Home", description: "Learn anything", blocks: hero("Learn", "Start a course") }],
  BOOKING:        [{ slug: "/", title: "Home", description: "Book in seconds", blocks: hero("Book", "Open slots today") }],
  CORPORATE:      [{ slug: "/", title: "Home", description: "About the company", blocks: hero("Welcome", "Learn more") }],
  AUTOMOTIVE:     [{ slug: "/", title: "Home", description: "Service your car", blocks: hero("Drive", "Book a service") }],
};

function hero(title: string, subtitle: string) {
  return [
    { type: "hero", props: { title, subtitle, cta: { label: "Get started", href: "#" } } },
    { type: "features", props: { items: [{ title: "Fast" }, { title: "Reliable" }, { title: "Beautiful" }] } },
    { type: "cta", props: { title: "Ready?", buttonLabel: "Contact us" } },
  ];
}
function simpleText(title: string) { return [{ type: "section", props: { title } }]; }
