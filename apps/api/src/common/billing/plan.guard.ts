import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PrismaService } from "../prisma/prisma.service";
import { PLAN_LIMITS, isUnlimited, type PlanCode } from "@nexora/shared";

export const PLAN_FEATURE_KEY = "plan-feature";
export const RequireFeature = (feature: keyof typeof PLAN_LIMITS["PROFESSIONAL"] | "customDomain" | "whiteLabel" | "api" | "automation") =>
  (target: any, key: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(PLAN_FEATURE_KEY, feature, descriptor.value);
    return descriptor;
  };

@Injectable()
export class PlanGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly prisma: PrismaService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const required = this.reflector.get<string>(PLAN_FEATURE_KEY, ctx.getHandler());
    if (!required) return true;

    const req = ctx.switchToHttp().getRequest();
    const tenantId: string | undefined = req.tenantId ?? req.user?.tid;
    if (!tenantId) throw new ForbiddenException("No tenant context for plan check");

    const sub = await this.prisma.subscription.findUnique({
      where: { tenantId },
      select: { planCode: true, status: true, plan: { select: { features: true } } },
    });
    if (!sub || (sub.status !== "ACTIVE" && sub.status !== "TRIALING")) {
      throw new ForbiddenException("Subscription inactive");
    }

    const features = (sub.plan?.features as Record<string, unknown>) ?? {};
    if (!features[required]) {
      throw new ForbiddenException(`Plan ${sub.planCode} does not include feature: ${required}`);
    }
    return true;
  }
}

/**
 * Centralised hard-limit checks. Throws if the action would exceed plan limits.
 */
@Injectable()
export class LimitService {
  constructor(private readonly prisma: PrismaService) {}

  private async getPlanCode(tenantId: string): Promise<PlanCode> {
    const sub = await this.prisma.subscription.findUnique({
      where: { tenantId },
      select: { planCode: true },
    });
    return (sub?.planCode ?? "STARTER") as PlanCode;
  }

  async assertCanCreateProject(tenantId: string): Promise<void> {
    const plan = await this.getPlanCode(tenantId);
    const limit = PLAN_LIMITS[plan].maxProjects;
    if (isUnlimited(limit)) return;
    const count = await this.prisma.project.count({ where: { tenantId, deletedAt: null } });
    if (count >= limit) {
      throw new ForbiddenException(`Plan ${plan} allows max ${limit} project(s). Upgrade to add more.`);
    }
  }

  async assertCanAddDomain(tenantId: string): Promise<void> {
    const plan = await this.getPlanCode(tenantId);
    const limit = PLAN_LIMITS[plan].maxDomains;
    if (isUnlimited(limit)) return;
    if (limit === 0) {
      throw new ForbiddenException(`Plan ${plan} does not include custom domains. Upgrade to Business or higher.`);
    }
    const count = await this.prisma.domain.count({ where: { tenantId, kind: "CUSTOM", status: { not: "REMOVED" } } });
    if (count >= limit) {
      throw new ForbiddenException(`Plan ${plan} allows max ${limit} custom domain(s).`);
    }
  }

  async assertCanInviteSeat(tenantId: string): Promise<void> {
    const plan = await this.getPlanCode(tenantId);
    const limit = PLAN_LIMITS[plan].maxSeats;
    if (isUnlimited(limit)) return;
    const count = await this.prisma.membership.count({ where: { tenantId } });
    if (count >= limit) {
      throw new ForbiddenException(`Plan ${plan} allows max ${limit} seat(s).`);
    }
  }
}
