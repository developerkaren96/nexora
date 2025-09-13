import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { createHash, randomBytes, randomUUID } from "crypto";
import { PrismaService } from "../../common/prisma/prisma.service";
import { User } from "@nexora/database";

const REFRESH_TTL = Number(process.env.JWT_REFRESH_TTL ?? 2592000); // 30d

@Injectable()
export class TokensService {
  constructor(private readonly jwt: JwtService, private readonly prisma: PrismaService) {}

  private hash(token: string) { return createHash("sha256").update(token).digest("hex"); }

  async issueAccess(user: Pick<User, "id" | "email" | "systemRole">, tid?: string, role?: string) {
    return this.jwt.signAsync({ sub: user.id, email: user.email, systemRole: user.systemRole, tid, role });
  }

  async issueRefresh(userId: string, opts: { ip?: string; userAgent?: string; familyId?: string }) {
    const raw = randomBytes(48).toString("base64url");
    const familyId = opts.familyId ?? randomUUID();
    await this.prisma.refreshToken.create({
      data: {
        userId,
        familyId,
        tokenHash: this.hash(raw),
        ip: opts.ip,
        userAgent: opts.userAgent?.slice(0, 256),
        expiresAt: new Date(Date.now() + REFRESH_TTL * 1000),
      },
    });
    return raw;
  }

  /** Rotating refresh — detects theft by replay of an already-rotated token. */
  async rotate(rawRefresh: string, opts: { ip?: string; userAgent?: string }) {
    const existing = await this.prisma.refreshToken.findUnique({
      where: { tokenHash: this.hash(rawRefresh) },
      include: { user: true },
    });
    if (!existing || existing.expiresAt < new Date()) throw new UnauthorizedException("Refresh invalid");

    if (existing.revokedAt) {
      // Token reuse — kill the whole family
      await this.prisma.refreshToken.updateMany({
        where: { familyId: existing.familyId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      throw new UnauthorizedException("Refresh reuse detected; session terminated");
    }

    const newRaw = randomBytes(48).toString("base64url");
    await this.prisma.$transaction([
      this.prisma.refreshToken.update({
        where: { id: existing.id },
        data: { revokedAt: new Date(), replacedBy: this.hash(newRaw) },
      }),
      this.prisma.refreshToken.create({
        data: {
          userId: existing.userId,
          familyId: existing.familyId,
          tokenHash: this.hash(newRaw),
          ip: opts.ip,
          userAgent: opts.userAgent?.slice(0, 256),
          expiresAt: new Date(Date.now() + REFRESH_TTL * 1000),
        },
      }),
    ]);
    const access = await this.issueAccess(existing.user);
    return { access, refresh: newRaw };
  }

  async revoke(rawRefresh: string) {
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash: this.hash(rawRefresh), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}
