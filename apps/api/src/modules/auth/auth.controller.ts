import { Body, Controller, HttpCode, Post, Req, Res, UseGuards, Get } from "@nestjs/common";
import { Request, Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { TokensService } from "./tokens.service";
import { TwoFactorService } from "./two-factor.service";
import { Public } from "../../common/auth/public.decorator";
import { CurrentUser, JwtUser } from "../../common/auth/current-user.decorator";
import { LoginDto, RegisterDto, ConfirmTotpDto } from "./dto";

const REFRESH_COOKIE = "refresh_token";
const ACCESS_COOKIE = "access_token";

function cookieOpts(maxAgeSec: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSec * 1000,
    domain: process.env.COOKIE_DOMAIN || undefined,
  };
}

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly tokens: TokensService,
    private readonly twoFa: TwoFactorService,
  ) {}

  @Public() @Post("register") @HttpCode(200)
  async register(@Body() dto: RegisterDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const r = await this.auth.register(dto, { ip: req.ip, userAgent: req.headers["user-agent"] as string });
    this.setCookies(res, r.access, r.refresh);
    return { user: r.user, tenantId: r.tenantId };
  }

  @Public() @Post("login") @HttpCode(200)
  async login(@Body() dto: LoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const r = await this.auth.login(dto, { ip: req.ip, userAgent: req.headers["user-agent"] as string });
    this.setCookies(res, r.access, r.refresh);
    return { user: r.user, tenantId: r.tenantId };
  }

  @Public() @Post("refresh") @HttpCode(200)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const raw = req.cookies?.[REFRESH_COOKIE];
    if (!raw) return res.status(401).end();
    const r = await this.tokens.rotate(raw, { ip: req.ip, userAgent: req.headers["user-agent"] as string });
    this.setCookies(res, r.access, r.refresh);
    return { ok: true };
  }

  @Post("logout") @HttpCode(204)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const raw = req.cookies?.[REFRESH_COOKIE];
    if (raw) await this.tokens.revoke(raw);
    res.clearCookie(ACCESS_COOKIE); res.clearCookie(REFRESH_COOKIE);
  }

  @Get("me")
  me(@CurrentUser() u: JwtUser) { return u; }

  @Post("switch-tenant") @HttpCode(200)
  async switch(@Body() body: { slug: string }, @Req() req: Request, @CurrentUser() u: JwtUser, @Res({ passthrough: true }) res: Response) {
    const r = await this.auth.switchTenant(u.sub, body.slug, { ip: req.ip, userAgent: req.headers["user-agent"] as string });
    this.setCookies(res, r.access, r.refresh);
    return { tenantId: r.tenantId };
  }

  @Post("2fa/begin")
  async beginTotp(@CurrentUser() u: JwtUser) { return this.twoFa.beginEnrollment(u.sub, u.email); }

  @Post("2fa/confirm")
  async confirmTotp(@CurrentUser() u: JwtUser, @Body() dto: ConfirmTotpDto) {
    return this.twoFa.confirmEnrollment(u.sub, dto.code);
  }

  @Post("2fa/disable") @HttpCode(204)
  async disableTotp(@CurrentUser() u: JwtUser) { await this.twoFa.disable(u.sub); }

  private setCookies(res: Response, access: string, refresh: string) {
    res.cookie(ACCESS_COOKIE, access, cookieOpts(Number(process.env.JWT_ACCESS_TTL ?? 900)));
    res.cookie(REFRESH_COOKIE, refresh, cookieOpts(Number(process.env.JWT_REFRESH_TTL ?? 2592000)));
  }
}
