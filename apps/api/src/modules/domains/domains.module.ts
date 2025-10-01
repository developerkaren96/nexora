import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { DomainsController } from "./domains.controller";
import { DomainsService } from "./domains.service";
import { DomainVerificationCron } from "./domain-verification.cron";
import { LimitService } from "../../common/billing/plan.guard";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [DomainsController],
  providers: [DomainsService, DomainVerificationCron, LimitService],
})
export class DomainsModule {}
