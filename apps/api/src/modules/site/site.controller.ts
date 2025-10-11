import { Controller, Get, Query, NotFoundException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "../../common/auth/public.decorator";
import { CurrentTenant } from "../../common/tenant/current-tenant.decorator";
import { PrismaService } from "../../common/prisma/prisma.service";

@ApiTags("site")
@Controller("site")
export class SiteController {
  constructor(private readonly prisma: PrismaService) {}

  @Public() @Get("page")
  async page(@CurrentTenant() tid: string, @Query("path") path = "/") {
    // Use tenant context to fetch the active project for this subdomain.
    const project = await this.prisma.project.findFirst({
      where: { tenantId: tid, status: "ACTIVE", deletedAt: null },
      orderBy: { createdAt: "asc" },
    });
    if (!project) throw new NotFoundException("No published project");
    const page = await this.prisma.page.findUnique({
      where: { projectId_slug: { projectId: project.id, slug: path } },
    });
    if (!page || !page.isPublished) throw new NotFoundException();
    return { title: page.title, description: page.description, blocks: page.blocks, metaJson: page.metaJson };
  }

  @Public() @Get("mobile-config")
  async mobileConfig(@CurrentTenant() tid: string) {
    const project = await this.prisma.project.findFirst({
      where: { tenantId: tid, status: "ACTIVE", deletedAt: null },
      include: { mobileConfig: true },
      orderBy: { createdAt: "asc" },
    });
    if (!project?.mobileConfig) throw new NotFoundException();
    const m = project.mobileConfig;
    return { appName: m.appName, bundleId: m.bundleId, themeJson: m.themeJson, iconUrl: m.iconUrl, splashUrl: m.splashUrl, features: m.features };
  }
}
