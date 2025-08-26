import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface JwtUser {
  sub: string;       // user id
  email: string;
  systemRole: "USER" | "PLATFORM_ADMIN" | "PLATFORM_SUPPORT";
  tid?: string;      // active tenant id
  role?: "TENANT_OWNER" | "TENANT_ADMIN" | "TENANT_MEMBER" | "TENANT_BILLING" | "TENANT_READONLY";
}

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext): JwtUser => {
  return ctx.switchToHttp().getRequest().user;
});
