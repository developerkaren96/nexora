import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";
import { LimitService } from "../../common/billing/plan.guard";
import { DomainKind, DomainStatus } from "@nexora/database";
import { randomBytes } from "crypto";
import { promises as dnsPromises } from "dns";

@Injectable()
export class DomainsService {
  constructor(private readonly prisma: PrismaService, private readonly limits: LimitService) {}

  async list(tenantId: string) {
    return this.prisma.domain.findMany({ where: { tenantId }, orderBy: { createdAt: "desc" } });
  }

  async add(tenantId: string, projectId: string, hostname: string) {
    await this.limits.assertCanAddDomain(tenantId);
    hostname = hostname.toLowerCase().trim();
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(hostname)) throw new ConflictException("Invalid hostname");
    const exists = await this.prisma.domain.findUnique({ where: { hostname } });
    if (exists) throw new ConflictException("Domain already registered");
    return this.prisma.domain.create({
      data: {
        tenantId, projectId, hostname, kind: DomainKind.CUSTOM,
        status: DomainStatus.PENDING_VERIFICATION,
        verifyToken: `nexora-verify-${randomBytes(12).toString("hex")}`,
      },
    });
  }

  /**
   * Tries to verify a single pending domain. Used by both the cron and a manual "Verify now" button.
   * Returns the updated row.
   */
  async verifyOne(domainId: string) {
    const d = await this.prisma.domain.findUnique({ where: { id: domainId } });
    if (!d) throw new NotFoundException();
    if (d.status === DomainStatus.ACTIVE) return d;

    const expectedTxt = d.verifyToken;
    if (!expectedTxt) return d;

    try {
      const txts = (await dnsPromises.resolveTxt(`_nexora-verify.${d.hostname}`)).flat();
      if (!txts.includes(expectedTxt)) return d;

      // Also confirm CNAME points to the platform ingress.
      const cnames = await dnsPromises.resolveCname(d.hostname).catch(() => []);
      const ingress = process.env.PLATFORM_INGRESS_HOST ?? `ingress.${process.env.ROOT_DOMAIN ?? "nexora.app"}`;
      if (!cnames.some((c) => c.toLowerCase() === ingress.toLowerCase())) return d;

      const updated = await this.prisma.domain.update({
        where: { id: d.id },
        data: { status: DomainStatus.VERIFIED, verifiedAt: new Date() },
      });
      // NEXORA: TODO trigger cert-manager Certificate creation + edge config reload
      // Mark ACTIVE once cert issued; for dev we mark immediately.
      return this.prisma.domain.update({
        where: { id: d.id },
        data: { status: DomainStatus.ACTIVE, tlsIssuedAt: new Date(), tlsExpiresAt: new Date(Date.now() + 90 * 86400_000) },
      });
    } catch {
      return d; // DNS lookup failed — try again next tick
    }
  }

  async remove(tenantId: string, id: string) {
    const d = await this.prisma.domain.findFirst({ where: { id, tenantId } });
    if (!d) throw new NotFoundException();
    if (d.kind === "SUBDOMAIN") throw new ConflictException("Subdomain cannot be removed");
    await this.prisma.domain.update({ where: { id }, data: { status: DomainStatus.REMOVED } });
    return { ok: true };
  }
}
