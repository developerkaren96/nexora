import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) { super(); }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: TUser, _info: any, ctx: ExecutionContext): TUser {
    if (err || !user) throw err ?? new UnauthorizedException();
    // Propagate tenant id from JWT into req.tenantId if middleware didn't set one
    const req = ctx.switchToHttp().getRequest();
    const tid = (user as any).tid as string | undefined;
    if (tid && !req.tenantId) req.tenantId = tid;
    return user;
  }
}
