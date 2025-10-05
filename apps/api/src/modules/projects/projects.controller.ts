import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto, UpdateProjectDto } from "./dto";
import { CurrentTenant } from "../../common/tenant/current-tenant.decorator";
import { Roles } from "../../common/auth/roles.decorator";

@ApiTags("projects")
@Controller("projects")
export class ProjectsController {
  constructor(private readonly svc: ProjectsService) {}

  @Get() @Roles("TENANT_OWNER", "TENANT_ADMIN", "TENANT_MEMBER", "TENANT_READONLY")
  list(@CurrentTenant() tid: string) { return this.svc.list(tid); }

  @Get(":id") @Roles("TENANT_OWNER", "TENANT_ADMIN", "TENANT_MEMBER", "TENANT_READONLY")
  get(@CurrentTenant() tid: string, @Param("id") id: string) { return this.svc.get(tid, id); }

  @Post() @Roles("TENANT_OWNER", "TENANT_ADMIN")
  create(@CurrentTenant() tid: string, @Body() dto: CreateProjectDto) { return this.svc.create(tid, dto); }

  @Patch(":id") @Roles("TENANT_OWNER", "TENANT_ADMIN")
  update(@CurrentTenant() tid: string, @Param("id") id: string, @Body() dto: UpdateProjectDto) { return this.svc.update(tid, id, dto); }

  @Delete(":id") @Roles("TENANT_OWNER", "TENANT_ADMIN")
  destroy(@CurrentTenant() tid: string, @Param("id") id: string) { return this.svc.softDelete(tid, id); }
}
