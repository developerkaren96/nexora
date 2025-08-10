/**
 * Apply Postgres Row-Level Security policies on every tenant-scoped table.
 *
 * Strategy:
 *   - Each request opens a transaction and runs:
 *       SET LOCAL app.current_tenant = '<uuid>'
 *     The RLS policy compares `tenant_id` to that GUC.
 *   - PlatformAdmin requests run:
 *       SET LOCAL app.bypass_rls = 'on'
 *     The policy short-circuits to TRUE in that case.
 *
 * Run after every `prisma db push` or `migrate deploy`.
 */
import { PrismaClient } from "@prisma/client";

const TENANT_TABLES = [
  "tenants",
  "memberships",
  "projects",
  "provision_steps",
  "pages",
  "mobile_configs",
  "domains",
  "customers",
  "crm_pipelines",
  "crm_deals",
  "orders",
  "subscriptions",
  "invoices",
  "api_keys",
  "analytics_events",
  "audit_events",
  "notifications",
];

const TENANT_ID_COLUMN: Record<string, string> = {
  tenants: "id", // self
};

async function main() {
  const prisma = new PrismaClient();
  try {
    for (const table of TENANT_TABLES) {
      const col = TENANT_ID_COLUMN[table] ?? "tenantId";

      await prisma.$executeRawUnsafe(`ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY;`);
      await prisma.$executeRawUnsafe(`ALTER TABLE "${table}" FORCE ROW LEVEL SECURITY;`);

      // Drop+recreate for idempotency
      await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS tenant_isolation ON "${table}";`);
      await prisma.$executeRawUnsafe(`
        CREATE POLICY tenant_isolation ON "${table}"
        USING (
          current_setting('app.bypass_rls', true) = 'on'
          OR "${col}" = NULLIF(current_setting('app.current_tenant', true), '')::uuid
        )
        WITH CHECK (
          current_setting('app.bypass_rls', true) = 'on'
          OR "${col}" = NULLIF(current_setting('app.current_tenant', true), '')::uuid
        );
      `);
    }
    // eslint-disable-next-line no-console
    console.log(`✔ RLS applied to ${TENANT_TABLES.length} tables`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
