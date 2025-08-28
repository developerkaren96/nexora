import { SetMetadata } from "@nestjs/common";

export type Role =
  | "PLATFORM_ADMIN"
  | "PLATFORM_SUPPORT"
  | "TENANT_OWNER"
  | "TENANT_ADMIN"
  | "TENANT_MEMBER"
  | "TENANT_BILLING"
  | "TENANT_READONLY";

export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
