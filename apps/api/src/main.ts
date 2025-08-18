import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "nestjs-pino";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { json, raw } from "express";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  // Stripe webhook must see the raw body — register BEFORE json()
  app.use("/v1/webhooks/stripe", raw({ type: "application/json" }));
  app.use(json({ limit: "2mb" }));
  app.use(cookieParser(process.env.JWT_ACCESS_SECRET));

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  // Allow:
  //  - any explicit origin in CORS_ORIGINS
  //  - any *.localhost / localhost / 127.0.0.1 on any port (dev: app.localhost, admin.localhost, acme.localhost, …)
  //  - any *.<ROOT_DOMAIN> in production
  const allowList = (process.env.CORS_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? process.env.ROOT_DOMAIN ?? "nexora.app";
  app.enableCors({
    credentials: true,
    origin: (origin, cb) => {
      // Server-to-server / curl / same-origin (no Origin header) → allow
      if (!origin) return cb(null, true);
      if (allowList.includes(origin)) return cb(null, true);
      try {
        const { hostname } = new URL(origin);
        const isLocal = hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".localhost");
        const isProd = hostname === rootDomain || hostname.endsWith(`.${rootDomain}`);
        if (isLocal || isProd) return cb(null, true);
      } catch { /* fallthrough */ }
      return cb(new Error(`CORS: origin ${origin} not allowed`), false);
    },
  });

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // OpenAPI / Swagger
  const config = new DocumentBuilder()
    .setTitle("Nexora API")
    .setDescription("Multi-tenant SaaS platform API")
    .setVersion("1.0")
    .addBearerAuth()
    .addCookieAuth("access_token")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, { swaggerOptions: { persistAuthorization: true } });

  app.enableShutdownHooks();
  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port, "0.0.0.0");
  // eslint-disable-next-line no-console
  console.log(`🚀 Nexora API listening on :${port}`);
}

bootstrap();
