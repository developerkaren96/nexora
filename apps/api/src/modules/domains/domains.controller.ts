import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { DomainsService } from "./domains.service";
import { CurrentTenant } from "../../common/tenant/current-tenant.decorator";
import { Roles } from "../../common/auth/roles.decorator";
import { RequireFeature } from "../../common/billing/plan.guard";

class AddDomainDto {
  @IsUUID() projectId!: string;
  @IsString() hostname!: string;
}

@ApiTags("domains")
@Controller("domains")
export class DomainsController {
  constructor(private readonly svc: DomainsService) {}

  @Get() @Roles("TENANT_OWNER", "TENANT_ADMIN", "TENANT_MEMBER")
  list(@CurrentTenant() tid: string) { return this.svc.list(tid); }

  @Post() @Roles("TENANT_OWNER", "TENANT_ADMIN") @RequireFeature("customDomain")
  add(@CurrentTenant() tid: string, @Body() dto: AddDomainDto) {
    return this.svc.add(tid, dto.projectId, dto.hostname);
  }

  @Post(":id/verify") @Roles("TENANT_OWNER", "TENANT_ADMIN")
  verify(@Param("id") id: string) { return this.svc.verifyOne(id); }

  @Delete(":id") @Roles("TENANT_OWNER", "TENANT_ADMIN")
  remove(@CurrentTenant() tid: string, @Param("id") id: string) { return this.svc.remove(tid, id); }
}
