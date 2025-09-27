import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";
import { PrismaService } from "../../common/prisma/prisma.service";
import { CurrentTenant } from "../../common/tenant/current-tenant.decorator";
import { Roles } from "../../common/auth/roles.decorator";

class UpsertCustomerDto {
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsUUID() projectId?: string;
}

@ApiTags("crm")
@Controller("crm")
@Roles("TENANT_OWNER", "TENANT_ADMIN", "TENANT_MEMBER")
export class CrmController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("customers")
  customers(@CurrentTenant() tid: string, @Query("q") q?: string) {
    return this.prisma.customer.findMany({
      where: { tenantId: tid, ...(q ? { OR: [{ email: { contains: q } }, { name: { contains: q, mode: "insensitive" } }] } : {}) },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
  }

  @Post("customers")
  createCustomer(@CurrentTenant() tid: string, @Body() dto: UpsertCustomerDto) {
    return this.prisma.customer.create({ data: { tenantId: tid, ...dto } });
  }

  @Patch("customers/:id")
  updateCustomer(@CurrentTenant() tid: string, @Param("id") id: string, @Body() dto: UpsertCustomerDto) {
    return this.prisma.customer.update({ where: { id }, data: { ...dto, tenantId: tid } });
  }

  @Delete("customers/:id")
  deleteCustomer(@Param("id") id: string) {
    return this.prisma.customer.delete({ where: { id } }).then(() => ({ ok: true }));
  }

  @Get("pipelines")
  pipelines(@CurrentTenant() tid: string) {
    return this.prisma.crmPipeline.findMany({ where: { tenantId: tid }, include: { deals: true } });
  }

  @Get("deals")
  deals(@CurrentTenant() tid: string) {
    return this.prisma.crmDeal.findMany({ where: { tenantId: tid }, orderBy: { updatedAt: "desc" }, take: 200 });
  }
}
