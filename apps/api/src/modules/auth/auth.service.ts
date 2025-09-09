import { ConflictException, Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import argon2 from "argon2";
import { PrismaService } from "../../common/prisma/prisma.service";
import { TokensService } from "./tokens.service";
import { TwoFactorService } from "./two-factor.service";
import { RegisterDto, LoginDto } from "./dto";
import { MembershipRole, TenantStatus, PlanCode } from "@nexora/database";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokens: TokensService,
    private readonly twoFa: TwoFactorService,
  ) {}

  private hash(pwd: string) {
    return argon2.hash(pwd, { type: argon2.argon2id, secret: Buffer.from(process.env.ARGON_SECRET ?? "dev-pepper") });
  }
  private verify(hash: string, pwd: string) {
    return argon2.verify(hash, pwd, { secret: Buffer.from(process.env.ARGON_SECRET ?? "dev-pepper") });
  }

  async register(dto: RegisterDto, ctx: { ip?: string; userAgent?: string }) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException("Email already registered");

    const passwordHash = await this.hash(dto.password);
    const user = await this.prisma.user.create({
      data: { email: dto.email, name: dto.name, passwordHash },
    });

    let tid: string | undefined; let role: MembershipRole | undefined;
    if (dto.tenantSlug) {
      const tenant = await this.prisma.tenant.create({
        data: {
          slug: dto.tenantSlug,
          name: dto.tenantName ?? dto.tenantSlug,
          ownerId: user.id,
          status: TenantStatus.TRIAL,
          subscription: {
            create: {
              planCode: PlanCode.STARTER,
              status: "TRIALING",
              trialEndsAt: new Date(Date.now() + 14 * 86400_000),
            },
          },
          memberships: {
            create: { userId: user.id, role: MembershipRole.TENANT_OWNER, acceptedAt: new Date() },
          },
        },
      });
      tid = tenant.id; role = MembershipRole.TENANT_OWNER;
    }

    const access = await this.tokens.issueAccess(user, tid, role);
    const refresh = await this.tokens.issueRefresh(user.id, ctx);
    return { user: this.toPublic(user), access, refresh, tenantId: tid };
  }

  async login(dto: LoginDto, ctx: { ip?: string; userAgent?: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !user.passwordHash || user.status !== "active") throw new UnauthorizedException("Invalid credentials");
    const ok = await this.verify(user.passwordHash, dto.password);
    if (!ok) throw new UnauthorizedException("Invalid credentials");

    if (user.twoFactorEnabled) {
      if (!dto.totp) throw new UnauthorizedException("2FA required");
      const valid = this.twoFa.verify(user.twoFactorSecret!, dto.totp)
        || (await this.twoFa.consumeRecoveryCode(user.id, dto.totp));
      if (!valid) throw new UnauthorizedException("Invalid 2FA code");
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date(), lastLoginIp: ctx.ip },
    });

    // Pick default tenant: most recent membership
    const membership = await this.prisma.membership.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const access = await this.tokens.issueAccess(user, membership?.tenantId, membership?.role);
    const refresh = await this.tokens.issueRefresh(user.id, ctx);
    return { user: this.toPublic(user), access, refresh, tenantId: membership?.tenantId };
  }

  async switchTenant(userId: string, tenantSlug: string, ctx: { ip?: string; userAgent?: string }) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug: tenantSlug } });
    if (!tenant) throw new BadRequestException("Tenant not found");
    const membership = await this.prisma.membership.findUnique({
      where: { tenantId_userId: { tenantId: tenant.id, userId } },
    });
    if (!membership) throw new UnauthorizedException("Not a member of this tenant");
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const access = await this.tokens.issueAccess(user, tenant.id, membership.role);
    const refresh = await this.tokens.issueRefresh(user.id, ctx);
    return { access, refresh, tenantId: tenant.id };
  }

  private toPublic(u: { id: string; email: string; name: string | null; avatarUrl: string | null; systemRole: any; twoFactorEnabled: boolean }) {
    return { id: u.id, email: u.email, name: u.name, avatarUrl: u.avatarUrl, systemRole: u.systemRole, twoFactorEnabled: u.twoFactorEnabled };
  }
}
