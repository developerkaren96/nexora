import { Injectable, Inject, Scope, BadRequestException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { PrismaService } from "./prisma.service";

/**
 * Request-scoped wrapper that runs every query inside a transaction
 * with `SET LOCAL app.current_tenant = '<uuid>'`. Postgres RLS does the
 * isolation; the app cannot accidentally read another tenant's rows even
 * if it forgets a WHERE clause.
 *
 * Usage:
 *   await this.tenantDb.run(async (tx) => tx.project.findMany());
 */
@Injectable({ scope: Scope.REQUEST })
export class TenantPrismaService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private readonly req: Request & { tenantId?: string; user?: { systemRole?: string } },
  ) {}

  async run<T>(fn: (tx: PrismaService) => Promise<T>): Promise<T> {
    const tenantId = this.req.tenantId;
    const isPlatformAdmin = this.req.user?.systemRole === "PLATFORM_ADMIN";

    if (!tenantId && !isPlatformAdmin) {
      throw new BadRequestException("Tenant context required");
    }

    return this.prisma.$transaction(async (tx) => {
      if (isPlatformAdmin && !tenantId) {
        await tx.$executeRawUnsafe(`SET LOCAL app.bypass_rls = 'on'`);
      } else if (tenantId) {
        // safe: tenantId is validated as uuid by middleware before reaching here
        await tx.$executeRawUnsafe(`SET LOCAL app.current_tenant = '${tenantId}'`);
      }
      return fn(tx as unknown as PrismaService);
    });
  }
}
