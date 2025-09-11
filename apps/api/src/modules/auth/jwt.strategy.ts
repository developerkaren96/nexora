import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { PrismaService } from "../../common/prisma/prisma.service";

const cookieExtractor = (req: Request): string | null => req?.cookies?.access_token ?? null;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    if (!payload?.sub) throw new UnauthorizedException();
    // If client requested a tenant context via header, validate that the user is a member.
    const slug = (req.headers["x-tenant-slug"] as string | undefined)?.toLowerCase();
    let tid: string | undefined = payload.tid;
    let role: string | undefined = payload.role;
    if (slug) {
      const tenant = await this.prisma.tenant.findUnique({ where: { slug }, select: { id: true } });
      if (tenant) {
        const m = await this.prisma.membership.findUnique({
          where: { tenantId_userId: { tenantId: tenant.id, userId: payload.sub } },
          select: { role: true },
        });
        if (m) { tid = tenant.id; role = m.role; }
      }
    }
    return { sub: payload.sub, email: payload.email, systemRole: payload.systemRole, tid, role };
  }
}
