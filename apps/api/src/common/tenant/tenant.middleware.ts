import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { TenantResolver } from "./tenant.resolver";

declare module "express" {
  interface Request {
    tenantId?: string;
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly resolver: TenantResolver) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const tid = await this.resolver.resolve(
      req.headers.host,
      (req.headers["x-tenant-slug"] as string | undefined)?.toLowerCase(),
      undefined, // JWT tid is set later by the JWT strategy
    );
    if (tid) req.tenantId = tid;
    next();
  }
}
