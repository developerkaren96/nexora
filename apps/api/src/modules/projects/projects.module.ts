import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { ProvisionProcessor } from "./provision.processor";
import { ProvisionService } from "./provision.service";
import { LimitService } from "../../common/billing/plan.guard";
import { ProjectsGateway } from "./projects.gateway";

@Module({
  imports: [BullModule.registerQueue({ name: "project-provision" })],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProvisionService, ProvisionProcessor, LimitService, ProjectsGateway],
})
export class ProjectsModule {}
