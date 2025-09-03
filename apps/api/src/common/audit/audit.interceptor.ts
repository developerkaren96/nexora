import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { PrismaService } from "../prisma/prisma.service";

const WRITE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const req = ctx.switchToHttp().getRequest();
    if (!WRITE_METHODS.has(req.method) || req.url?.startsWith("/v1/webhooks")) return next.handle();

    const start = Date.now();
    return next.handle().pipe(
      tap(async () => {
        try {
          const action =
            req.method === "POST" ? "CREATE" :
            req.method === "DELETE" ? "DELETE" : "UPDATE";
          await this.prisma.auditEvent.create({
            data: {
              tenantId: req.tenantId ?? null,
              actorUserId: req.user?.sub ?? null,
              action,
              resource: req.route?.path ?? req.url,
              ip: req.ip,
              userAgent: req.headers["user-agent"]?.toString().slice(0, 256),
              after: { durationMs: Date.now() - start },
            },
          });
        } catch {/* never fail the request because of audit */}
      }),
    );
  }
}
