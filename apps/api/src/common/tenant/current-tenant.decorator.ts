import { createParamDecorator, ExecutionContext, BadRequestException } from "@nestjs/common";

export const CurrentTenant = createParamDecorator((_data: unknown, ctx: ExecutionContext): string => {
  const req = ctx.switchToHttp().getRequest();
  const tid: string | undefined = req.tenantId ?? req.user?.tid;
  if (!tid) throw new BadRequestException("Tenant context missing");
  return tid;
});
