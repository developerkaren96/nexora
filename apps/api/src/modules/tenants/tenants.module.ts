import { Module } from "@nestjs/common";
import { TenantsController } from "./tenants.controller";
import { LimitService } from "../../common/billing/plan.guard";

@Module({
  controllers: [TenantsController],
  providers: [LimitService],
  exports: [LimitService],
})
export class TenantsModule {}
