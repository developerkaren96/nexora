import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IsEnum, IsUrl } from "class-validator";
import { PlanCode } from "@nexora/database";
import { BillingService } from "./billing.service";
import { PrismaService } from "../../common/prisma/prisma.service";
import { CurrentTenant } from "../../common/tenant/current-tenant.decorator";
import { Roles } from "../../common/auth/roles.decorator";
import { Public } from "../../common/auth/public.decorator";

class CheckoutDto {
  @IsEnum(PlanCode) plan!: PlanCode;
  @IsUrl({ require_tld: false }) successUrl!: string;
  @IsUrl({ require_tld: false }) cancelUrl!: string;
}
class PortalDto { @IsUrl({ require_tld: false }) returnUrl!: string; }

@ApiTags("billing")
@Controller("billing")
export class BillingController {
  constructor(private readonly svc: BillingService, private readonly prisma: PrismaService) {}

  @Public() @Get("plans")
  plans() { return this.prisma.plan.findMany({ where: { isPublic: true }, orderBy: { sortOrder: "asc" } }); }

  @Get("subscription") @Roles("TENANT_OWNER", "TENANT_ADMIN", "TENANT_BILLING")
  subscription(@CurrentTenant() tid: string) {
    return this.prisma.subscription.findUnique({ where: { tenantId: tid }, include: { plan: true } });
  }

  @Get("invoices") @Roles("TENANT_OWNER", "TENANT_ADMIN", "TENANT_BILLING")
  invoices(@CurrentTenant() tid: string) {
    return this.prisma.invoice.findMany({ where: { tenantId: tid }, orderBy: { createdAt: "desc" }, take: 50 });
  }

  @Post("checkout") @Roles("TENANT_OWNER", "TENANT_BILLING")
  checkout(@CurrentTenant() tid: string, @Body() dto: CheckoutDto) {
    return this.svc.createCheckoutSession(tid, dto.plan, dto.successUrl, dto.cancelUrl);
  }

  @Post("portal") @Roles("TENANT_OWNER", "TENANT_BILLING")
  portal(@CurrentTenant() tid: string, @Body() dto: PortalDto) {
    return this.svc.createPortalSession(tid, dto.returnUrl);
  }
}
