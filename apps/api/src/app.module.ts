import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { BullModule } from "@nestjs/bullmq";
import { LoggerModule } from "nestjs-pino";

import { PrismaModule } from "./common/prisma/prisma.module";
import { TenantModule } from "./common/tenant/tenant.module";
import { TenantMiddleware } from "./common/tenant/tenant.middleware";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { TenantsModule } from "./modules/tenants/tenants.module";
import { ProjectsModule } from "./modules/projects/projects.module";
import { DomainsModule } from "./modules/domains/domains.module";
import { BillingModule } from "./modules/billing/billing.module";
import { TemplatesModule } from "./modules/templates/templates.module";
import { CrmModule } from "./modules/crm/crm.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { AdminModule } from "./modules/admin/admin.module";
import { WebhooksModule } from "./modules/webhooks/webhooks.module";
import { HealthModule } from "./modules/health/health.module";
import { SiteModule } from "./modules/site/site.module";

import { JwtAuthGuard } from "./common/auth/jwt-auth.guard";
import { RolesGuard } from "./common/auth/roles.guard";
import { PlanGuard } from "./common/billing/plan.guard";
import { AuditInterceptor } from "./common/audit/audit.interceptor";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV === "production" ? undefined : { target: "pino-pretty" },
        redact: ["req.headers.authorization", "req.headers.cookie"],
        customProps: (req) => ({ tenantId: (req as any).tenantId, userId: (req as any).user?.id }),
      },
    }),
    ThrottlerModule.forRoot([
      { name: "short",  ttl: 1000,  limit: 30 },
      { name: "medium", ttl: 60000, limit: 600 },
    ]),
    BullModule.forRoot({
      connection: { url: process.env.REDIS_URL ?? "redis://localhost:6379" },
      defaultJobOptions: {
        attempts: 5,
        backoff: { type: "exponential", delay: 2000 },
        removeOnComplete: 1000,
        removeOnFail: 5000,
      },
    }),
    ScheduleModule.forRoot(),

    PrismaModule,
    TenantModule,
    AuthModule,
    UsersModule,
    TenantsModule,
    ProjectsModule,
    DomainsModule,
    BillingModule,
    TemplatesModule,
    CrmModule,
    AnalyticsModule,
    AdminModule,
    WebhooksModule,
    HealthModule,
    SiteModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: PlanGuard },
    { provide: APP_INTERCEPTOR, useClass: AuditInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes("*");
  }
}
