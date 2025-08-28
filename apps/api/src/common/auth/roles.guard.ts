import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY, Role } from "./roles.decorator";
import { IS_PUBLIC_KEY } from "./public.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [ctx.getHandler(), ctx.getClass()]);
    if (isPublic) return true;

    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [ctx.getHandler(), ctx.getClass()]);
    if (!required || required.length === 0) return true;

    const user = ctx.switchToHttp().getRequest().user;
    if (!user) throw new ForbiddenException();

    // Platform admins bypass tenant roles
    if (user.systemRole === "PLATFORM_ADMIN" || user.systemRole === "PLATFORM_SUPPORT") {
      if (required.includes(user.systemRole)) return true;
      // PlatformAdmin also satisfies any tenant role
      if (user.systemRole === "PLATFORM_ADMIN") return true;
    }

    const tenantRole: Role | undefined = user.role;
    if (!tenantRole) throw new ForbiddenException("No tenant role");

    // Owner satisfies any tenant role
    if (tenantRole === "TENANT_OWNER") return true;
    if (required.includes(tenantRole)) return true;

    throw new ForbiddenException(`Requires one of: ${required.join(", ")}`);
  }
}
