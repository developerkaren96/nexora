import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Prisma } from "@nexora/database";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger("Exception");

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let payload: any = { error: "InternalError", message: "Unexpected error" };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const r = exception.getResponse();
      payload = typeof r === "string" ? { error: exception.name, message: r } : { error: exception.name, ...(r as object) };
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === "P2002") { status = HttpStatus.CONFLICT; payload = { error: "Conflict", message: "Unique constraint violated", target: exception.meta?.target }; }
      else if (exception.code === "P2025") { status = HttpStatus.NOT_FOUND; payload = { error: "NotFound", message: "Resource not found" }; }
      else { status = HttpStatus.BAD_REQUEST; payload = { error: "DatabaseError", code: exception.code }; }
    } else if (exception instanceof Error) {
      payload = { error: exception.name, message: exception.message };
    }

    if (status >= 500) {
      this.logger.error({ err: exception, url: req.url, method: req.method, tenantId: req.tenantId, userId: req.user?.sub }, "Unhandled exception");
    }

    res.status(status).json({
      ...payload,
      statusCode: status,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
