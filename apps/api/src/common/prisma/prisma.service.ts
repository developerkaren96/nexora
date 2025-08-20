import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@nexora/database";

/**
 * Unscoped Prisma — used only by:
 *   - bootstrap / migrations / seed
 *   - explicit PLATFORM_ADMIN bypass paths (must SET app.bypass_rls = 'on' in tx)
 *   - webhook handlers that don't yet have a tenant context
 *
 * Everything else MUST use TenantPrismaService.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() { await this.$connect(); }
  async onModuleDestroy() { await this.$disconnect(); }
}
