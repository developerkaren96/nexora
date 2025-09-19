import { Controller, Get, Param, Patch, Body, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/auth/roles.decorator";
import { PrismaService } from "../../common/prisma/prisma.service";

@ApiTags("admin")
@Controller("admin")
@Roles("PLATFORM_ADMIN")
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("stats")
  async stats() {
    const [tenants, users, activeSubs, projects, mrr] = await Promise.all([
      this.prisma.tenant.count({ where: { deletedAt: null } }),
      this.prisma.user.count({ where: { deletedAt: null } }),
      this.prisma.subscription.count({ where: { status: { in: ["ACTIVE", "TRIALING"] } } }),
      this.prisma.project.count({ where: { deletedAt: null } }),
      this.prisma.$queryRaw<{ sum: bigint }[]>`
        SELECT COALESCE(SUM(p."monthlyPriceUsd"), 0)::bigint AS sum
        FROM subscriptions s JOIN plans p ON p.code = s."planCode"
        WHERE s.status = 'ACTIVE'
      `,
    ]);
    return { tenants, users, activeSubs, projects, mrrCents: Number(mrr[0]?.sum ?? 0) };
  }

  @Get("tenants")
  tenants(@Query("q") q?: string, @Query("status") status?: string) {
    return this.prisma.tenant.findMany({
      where: {
        ...(q ? { OR: [{ slug: { contains: q } }, { name: { contains: q, mode: "insensitive" } }] } : {}),
        ...(status ? { status: status as any } : {}),
      },
      include: { subscription: true, _count: { select: { projects: true, memberships: true } } },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  }

  @Patch("tenants/:id")
  updateTenant(@Param("id") id: string, @Body() data: { status?: string; storageUsedMb?: number }) {
    return this.prisma.tenant.update({ where: { id }, data: data as any });
  }

  @Get("audit")
  audit(@Query("tenantId") tenantId?: string, @Query("take") take = "100") {
    return this.prisma.auditEvent.findMany({
      where: tenantId ? { tenantId } : {},
      orderBy: { createdAt: "desc" },
      take: Math.min(Number(take), 500),
    });
  }

  @Get("overview")
  async overview() {
    const [recentTenants, recentUsers, planBreakdown, byStatus] = await Promise.all([
      this.prisma.tenant.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: 6,
        select: { id: true, slug: true, name: true, status: true, createdAt: true, brandColor: true },
      }),
      this.prisma.user.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: 6,
        select: { id: true, email: true, name: true, systemRole: true, createdAt: true },
      }),
      this.prisma.subscription.groupBy({ by: ["planCode"], _count: { _all: true } }),
      this.prisma.tenant.groupBy({ by: ["status"], _count: { _all: true }, where: { deletedAt: null } }),
    ]);
    return { recentTenants, recentUsers, planBreakdown, byStatus };
  }
}
