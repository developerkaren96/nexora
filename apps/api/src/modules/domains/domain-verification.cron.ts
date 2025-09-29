import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "../../common/prisma/prisma.service";
import { DomainsService } from "./domains.service";

@Injectable()
export class DomainVerificationCron {
  private readonly log = new Logger(DomainVerificationCron.name);
  constructor(private readonly prisma: PrismaService, private readonly svc: DomainsService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async tick() {
    const pending = await this.prisma.domain.findMany({
      where: { status: "PENDING_VERIFICATION", kind: "CUSTOM", createdAt: { gte: new Date(Date.now() - 24 * 3600_000) } },
      take: 50,
    });
    for (const d of pending) {
      try { await this.svc.verifyOne(d.id); } catch (e) { this.log.warn({ err: e, domain: d.hostname }, "verify failed"); }
    }
  }
}
