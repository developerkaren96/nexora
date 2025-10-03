import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "../../common/auth/public.decorator";
import { PrismaService } from "../../common/prisma/prisma.service";

@ApiTags("health")
@Controller()
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Public() @Get("healthz")
  liveness() { return { status: "ok" }; }

  @Public() @Get("readyz")
  async readiness() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: "ok" };
    } catch {
      throw new ServiceUnavailableException("db");
    }
  }

  @Public() @Get("metrics")
  metrics() {
    // NEXORA: TODO replace with prom-client registry export
    return "# HELP nexora_up 1 if up\n# TYPE nexora_up gauge\nnexora_up 1\n";
  }
}
