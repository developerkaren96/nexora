import { Body, Controller, Delete, Get, Param, Patch, Post, ForbiddenException, NotFoundException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsHexColor, IsOptional, IsString, IsUrl } from "class-validator";
import { PrismaService } from "../../common/prisma/prisma.service";
import { Roles } from "../../common/auth/roles.decorator";
import { CurrentUser, JwtUser } from "../../common/auth/current-user.decorator";
import { CurrentTenant } from "../../common/tenant/current-tenant.decorator";
import { LimitService } from "../../common/billing/plan.guard";
import { MembershipRole } from "@nexora/database";

class UpdateTenantDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsHexColor() brandColor?: string;
  @IsOptional() @IsUrl() logoUrl?: string;
}
class InviteDto {
  @IsEmail() email!: string;
  @IsEnum(MembershipRole) role!: MembershipRole;
}

@ApiTags("tenants")
@Controller("tenants")
export class TenantsController {
  constructor(private readonly prisma: PrismaService, private readonly limits: LimitService) {}

  @Get("current")
  async current(@CurrentTenant() tid: string) {
    return this.prisma.tenant.findUniqueOrThrow({
      where: { id: tid },
      include: { subscription: { include: { plan: true } } },
    });
  }

  @Patch("current") @Roles("TENANT_OWNER", "TENANT_ADMIN")
  async update(@CurrentTenant() tid: string, @Body() dto: UpdateTenantDto) {
    return this.prisma.tenant.update({ where: { id: tid }, data: dto });
  }

  @Get("members") @Roles("TENANT_OWNER", "TENANT_ADMIN", "TENANT_MEMBER")
  async members(@CurrentTenant() tid: string) {
    return this.prisma.membership.findMany({
      where: { tenantId: tid },
      include: { user: { select: { id: true, email: true, name: true, avatarUrl: true } } },
      orderBy: { createdAt: "asc" },
    });
  }

  @Post("members/invite") @Roles("TENANT_OWNER", "TENANT_ADMIN")
  async invite(@CurrentTenant() tid: string, @Body() dto: InviteDto) {
    await this.limits.assertCanInviteSeat(tid);
    let user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
      user = await this.prisma.user.create({ data: { email: dto.email } });
    }
    return this.prisma.membership.upsert({
      where: { tenantId_userId: { tenantId: tid, userId: user.id } },
      update: { role: dto.role },
      create: { tenantId: tid, userId: user.id, role: dto.role, invitedAt: new Date() },
    });
    // NEXORA: TODO send invite email with magic link via MailService
  }

  @Delete("members/:userId") @Roles("TENANT_OWNER", "TENANT_ADMIN")
  async remove(@CurrentTenant() tid: string, @Param("userId") userId: string, @CurrentUser() actor: JwtUser) {
    const m = await this.prisma.membership.findUnique({ where: { tenantId_userId: { tenantId: tid, userId } } });
    if (!m) throw new NotFoundException();
    if (m.role === "TENANT_OWNER" && actor.role !== "TENANT_OWNER") throw new ForbiddenException("Only owner can remove owner");
    await this.prisma.membership.delete({ where: { tenantId_userId: { tenantId: tid, userId } } });
    return { ok: true };
  }
}
