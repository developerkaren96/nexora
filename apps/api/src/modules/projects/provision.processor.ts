import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { ProvisionService } from "./provision.service";
import { ProjectsGateway } from "./projects.gateway";

@Processor("project-provision", { concurrency: Number(process.env.PROVISION_CONCURRENCY ?? 5) })
export class ProvisionProcessor extends WorkerHost {
  private readonly log = new Logger(ProvisionProcessor.name);
  constructor(private readonly svc: ProvisionService, private readonly gw: ProjectsGateway) { super(); }

  async process(job: Job<{ projectId: string; tenantId: string }>) {
    const { projectId, tenantId } = job.data;
    this.log.log({ job: job.name, projectId }, "Job start");
    if (job.name === "decommission") {
      // NEXORA: TODO tear down domain DNS, cert, CDN entries, mobile config bucket
      this.log.log({ projectId }, "Decommission stub");
      return;
    }
    await this.svc.run(projectId, tenantId, (step, status) => {
      this.gw.emitProgress(projectId, { step, status });
    });
    this.gw.emitProgress(projectId, { step: "DONE" as any, status: "SUCCEEDED" as any });
  }
}
