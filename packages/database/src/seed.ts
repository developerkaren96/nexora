import { PrismaClient, PlanCode, MembershipRole, SystemRole, TenantStatus, BusinessType } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

const PLANS = [
  {
    code: PlanCode.STARTER,
    name: "Starter",
    monthlyPriceUsd: 4900,
    yearlyPriceUsd: 49000,
    maxProjects: 1,
    maxDomains: 0,
    maxStorageGb: 10,
    maxSeats: 1,
    features: { customDomain: false, whiteLabel: false, api: false, automation: false },
    sortOrder: 1,
  },
  {
    code: PlanCode.BUSINESS,
    name: "Business",
    monthlyPriceUsd: 14900,
    yearlyPriceUsd: 149000,
    maxProjects: 3,
    maxDomains: 1,
    maxStorageGb: 100,
    maxSeats: 5,
    features: { customDomain: true, whiteLabel: false, api: false, automation: false },
    sortOrder: 2,
  },
  {
    code: PlanCode.PROFESSIONAL,
    name: "Professional",
    monthlyPriceUsd: 39900,
    yearlyPriceUsd: 399000,
    maxProjects: 10,
    maxDomains: 5,
    maxStorageGb: 500,
    maxSeats: 20,
    features: { customDomain: true, whiteLabel: "partial", api: true, automation: true },
    sortOrder: 3,
  },
  {
    code: PlanCode.ENTERPRISE,
    name: "Enterprise",
    monthlyPriceUsd: 99900,
    yearlyPriceUsd: 999000,
    maxProjects: -1,
    maxDomains: -1,
    maxStorageGb: -1,
    maxSeats: -1,
    features: { customDomain: true, whiteLabel: true, api: true, automation: true, sla: "99.99", dedicatedInfra: true },
    sortOrder: 4,
  },
];

const TEMPLATES = [
  { slug: "ecommerce-modern",   name: "Modern Store",      businessType: BusinessType.ECOMMERCE },
  { slug: "restaurant-bistro",  name: "Bistro",            businessType: BusinessType.RESTAURANT },
  { slug: "salon-luxe",         name: "Luxe Salon",        businessType: BusinessType.BEAUTY_SALON },
  { slug: "clinic-care",        name: "Care Clinic",       businessType: BusinessType.MEDICAL_CLINIC },
  { slug: "law-counsel",        name: "Counsel",           businessType: BusinessType.LAW_FIRM },
  { slug: "realestate-prime",   name: "Prime Estate",      businessType: BusinessType.REAL_ESTATE },
  { slug: "delivery-rocket",    name: "Rocket Delivery",   businessType: BusinessType.DELIVERY },
  { slug: "saas-crm-launch",    name: "CRM Launch",        businessType: BusinessType.SAAS_CRM },
  { slug: "school-online",      name: "Online School",     businessType: BusinessType.ONLINE_SCHOOL },
  { slug: "booking-spa",        name: "Spa Booking",       businessType: BusinessType.BOOKING },
  { slug: "corporate-clean",    name: "Corporate Clean",   businessType: BusinessType.CORPORATE },
  { slug: "auto-service-pro",   name: "Auto Service Pro",  businessType: BusinessType.AUTOMOTIVE },
];

async function main() {
  // Bypass RLS during seed
  await prisma.$executeRawUnsafe(`SET app.bypass_rls = 'on';`);

  // Plans (idempotent)
  for (const p of PLANS) {
    await prisma.plan.upsert({ where: { code: p.code }, update: p, create: p });
  }

  // Templates
  for (const t of TEMPLATES) {
    await prisma.template.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        ...t,
        description: `Production-ready ${t.name} template`,
        thumbnailUrl: `https://placehold.co/600x400?text=${encodeURIComponent(t.name)}`,
      },
    });
  }

  // IMPORTANT: argon2 must be hashed with the SAME pepper that auth.service.ts uses
  // for verification, otherwise login will always fail.
  const pepper = Buffer.from(process.env.ARGON_SECRET ?? "dev-pepper");
  const hash = (pwd: string) => argon2.hash(pwd, { type: argon2.argon2id, secret: pepper });

  // Platform admin
  const adminPwd = await hash("Admin123!");
  await prisma.user.upsert({
    where: { email: "admin@nexora.app" },
    update: { passwordHash: adminPwd, status: "active", systemRole: SystemRole.PLATFORM_ADMIN },
    create: {
      email: "admin@nexora.app",
      name: "Platform Admin",
      systemRole: SystemRole.PLATFORM_ADMIN,
      passwordHash: adminPwd,
      emailVerifiedAt: new Date(),
    },
  });

  // Demo tenant owner
  const ownerPwd = await hash("Owner123!");
  const owner = await prisma.user.upsert({
    where: { email: "owner@acme.test" },
    update: { passwordHash: ownerPwd, status: "active" },
    create: {
      email: "owner@acme.test",
      name: "Acme Owner",
      passwordHash: ownerPwd,
      emailVerifiedAt: new Date(),
    },
  });

  const tenant = await prisma.tenant.upsert({
    where: { slug: "acme" },
    update: {},
    create: {
      slug: "acme",
      name: "Acme Inc.",
      status: TenantStatus.ACTIVE,
      ownerId: owner.id,
      brandColor: "#6366F1",
    },
  });

  await prisma.membership.upsert({
    where: { tenantId_userId: { tenantId: tenant.id, userId: owner.id } },
    update: { role: MembershipRole.TENANT_OWNER },
    create: { tenantId: tenant.id, userId: owner.id, role: MembershipRole.TENANT_OWNER, acceptedAt: new Date() },
  });

  await prisma.subscription.upsert({
    where: { tenantId: tenant.id },
    update: {},
    create: {
      tenantId: tenant.id,
      planCode: PlanCode.BUSINESS,
      status: "ACTIVE",
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 86400_000),
    },
  });

  // eslint-disable-next-line no-console
  console.log("✔ Seed complete. Admin: admin@nexora.app / Admin123!  Tenant owner: owner@acme.test / Owner123!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
