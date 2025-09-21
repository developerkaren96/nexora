import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IsObject, IsOptional, IsString, IsUUID } from "class-validator";
import { PrismaService } from "../../common/prisma/prisma.service";
import { Public } from "../../common/auth/public.decorator";
import { CurrentTenant } from "../../common/tenant/current-tenant.decorator";
import { Roles } from "../../common/auth/roles.decorator";

class TrackDto {
  @IsString() name!: string;
  @IsOptional() @IsUUID() projectId?: string;
  @IsOptional() @IsString() anonymousId?: string;
  @IsOptional() @IsObject() properties?: Record<string, unknown>;
}

@ApiTags("analytics")
@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly prisma: PrismaService) {}

  /** Public endpoint used by tenant-deployed sites (subdomain resolves tenant). */
  @Public() @Post("track")
  async track(@CurrentTenant() tid: string, @Body() dto: TrackDto) {
    await this.prisma.analyticsEvent.create({
      data: { tenantId: tid, projectId: dto.projectId, name: dto.name, anonymousId: dto.anonymousId, properties: dto.properties as any },
    });
    return { ok: true };
  }

  @Get("summary") @Roles("TENANT_OWNER", "TENANT_ADMIN", "TENANT_MEMBER")
  async summary(@CurrentTenant() tid: string, @Query("days") daysStr = "30") {
    const days = Math.min(Math.max(Number(daysStr) || 30, 1), 365);
    const since = new Date(Date.now() - days * 86400_000);

    const byDay = await this.prisma.$queryRaw<{ day: Date; pageviews: bigint; orders: bigint }[]>`
      SELECT date_trunc('day', "occurredAt") AS day,
             COUNT(*) FILTER (WHERE name = 'pageview')      AS pageviews,
             COUNT(*) FILTER (WHERE name = 'order_placed')  AS orders
      FROM analytics_events
      WHERE "tenantId" = ${tid}::uuid AND "occurredAt" >= ${since}
      GROUP BY 1 ORDER BY 1;
    `;
    const revenue = await this.prisma.$queryRaw<{ sum: bigint }[]>`
      SELECT COALESCE(SUM("totalCents"), 0)::bigint AS sum FROM orders
      WHERE "tenantId" = ${tid}::uuid AND "createdAt" >= ${since} AND status = 'paid';
    `;
    return {
      since,
      byDay: byDay.map((r) => ({ day: r.day, pageviews: Number(r.pageviews), orders: Number(r.orders) })),
      revenueCents: Number(revenue[0]?.sum ?? 0),
    };
  }
}
