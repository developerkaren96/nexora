import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PrismaService } from "../../common/prisma/prisma.service";
import { Public } from "../../common/auth/public.decorator";

@ApiTags("templates")
@Controller("templates")
export class TemplatesController {
  constructor(private readonly prisma: PrismaService) {}

  @Public() @Get()
  list(@Query("type") type?: string) {
    return this.prisma.template.findMany({
      where: { isPublished: true, ...(type ? { businessType: type as any } : {}) },
      orderBy: [{ installCount: "desc" }, { name: "asc" }],
    });
  }

  @Public() @Get(":slug")
  detail(@Param("slug") slug: string) {
    return this.prisma.template.findUniqueOrThrow({
      where: { slug },
      include: { versions: { orderBy: { createdAt: "desc" }, take: 1 } },
    });
  }
}
