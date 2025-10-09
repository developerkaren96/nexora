import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { PrismaService } from "../../common/prisma/prisma.service";
import { LimitService } from "../../common/billing/plan.guard";
import { CreateProjectDto, UpdateProjectDto } from "./dto";
import { ProjectStatus, ProvisionStepName, ProvisionStepStatus } from "@nexora/database";

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly limits: LimitService,
    @InjectQueue("project-provision") private readonly queue: Queue,
  ) {}

  async list(tenantId: string) {
    return this.prisma.project.findMany({
      where: { tenantId, deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: { domains: { where: { isPrimary: true }, take: 1 } },
    });
  }

  async get(tenantId: string, id: string) {
    const p = await this.prisma.project.findFirst({
      where: { tenantId, id, deletedAt: null },
      include: { domains: true, steps: { orderBy: { createdAt: "asc" } }, mobileConfig: true, template: true },
    });
    if (!p) throw new NotFoundException();
    return p;
  }

  async create(tenantId: string, dto: CreateProjectDto) {
    await this.limits.assertCanCreateProject(tenantId);
    const existing = await this.prisma.project.findUnique({ where: { tenantId_slug: { tenantId, slug: dto.slug } } });
    if (existing) throw new ConflictException("Slug already taken in this tenant");

    const project = await this.prisma.$transaction(async (tx) => {
      const p = await tx.project.create({
        data: {
          tenantId,
          name: dto.name,
          slug: dto.slug,
          businessType: dto.businessType,
          status: ProjectStatus.PENDING,
          brandColor: dto.brandColor ?? "#6366F1",
          logoUrl: dto.logoUrl,
          templateId: dto.templateId,
        },
      });
      // Pre-create step rows so the UI can render a checklist immediately.
      await tx.provisionStep.createMany({
        data: Object.values(ProvisionStepName).map((name) => ({
          tenantId, projectId: p.id, name, status: ProvisionStepStatus.PENDING,
        })),
      });
      return p;
    });

    await this.queue.add(
      "provision",
      { projectId: project.id, tenantId },
      { jobId: `project:${project.id}`, attempts: 1 /* worker retries per-step */ },
    );
    return project;
  }

  async update(tenantId: string, id: string, dto: UpdateProjectDto) {
    await this.get(tenantId, id);
    return this.prisma.project.update({ where: { id }, data: dto });
  }

  async softDelete(tenantId: string, id: string) {
    await this.get(tenantId, id);
    await this.prisma.project.update({
      where: { id },
      data: { deletedAt: new Date(), status: ProjectStatus.DELETING },
    });
    await this.queue.add("decommission", { projectId: id, tenantId });
    return { ok: true };
  }
}
