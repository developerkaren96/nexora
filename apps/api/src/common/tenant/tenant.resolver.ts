import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

/**
 * Resolves a tenant from an incoming request, in this priority:
 *   1. Host header → custom domain match in `domains` table
 *   2. Host header → subdomain of ROOT_DOMAIN → tenant.slug
 *   3. X-Tenant-Slug header (used by dashboard client when on app.nexora.app)
 *   4. JWT claim `tid`
 */
@Injectable()
export class TenantResolver {
  private cache = new Map<string, { id: string; expires: number } | null>();
  private readonly rootDomain = (process.env.ROOT_DOMAIN ?? "nexora.app").toLowerCase();

  constructor(private readonly prisma: PrismaService) {}

  async resolve(host?: string, slugHeader?: string, jwtTid?: string): Promise<string | null> {
    if (jwtTid) return jwtTid;

    const hostname = (host ?? "").toLowerCase().split(":")[0];

    if (slugHeader) {
      const tenant = await this.lookupBySlug(slugHeader);
      if (tenant) return tenant;
    }

    if (!hostname) return null;

    if (hostname.endsWith(`.${this.rootDomain}`)) {
      const slug = hostname.slice(0, -1 * (this.rootDomain.length + 1));
      // reserved subdomains: app, api, www, admin, docs
      if (["app", "api", "www", "admin", "docs"].includes(slug)) return null;
      return this.lookupBySlug(slug);
    }

    // custom domain
    const cached = this.cache.get(hostname);
    if (cached && cached.expires > Date.now()) return cached.id;
    const domain = await this.prisma.domain.findUnique({
      where: { hostname },
      select: { tenantId: true, status: true },
    });
    const id = domain && domain.status === "ACTIVE" ? domain.tenantId : null;
    this.cache.set(hostname, id ? { id, expires: Date.now() + 60_000 } : null);
    return id;
  }

  private async lookupBySlug(slug: string): Promise<string | null> {
    const key = `slug:${slug}`;
    const cached = this.cache.get(key);
    if (cached && cached.expires > Date.now()) return cached.id;
    const t = await this.prisma.tenant.findUnique({ where: { slug }, select: { id: true } });
    const id = t?.id ?? null;
    this.cache.set(key, id ? { id, expires: Date.now() + 60_000 } : null);
    return id;
  }
}
