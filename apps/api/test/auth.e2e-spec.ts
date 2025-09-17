import request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AppModule } from "../src/app.module";

describe("auth (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });
  afterAll(async () => app?.close());

  it("rejects login with bad credentials", async () => {
    await request(app.getHttpServer())
      .post("/v1/auth/login")
      .send({ email: "nope@example.com", password: "wrongpw1234" })
      .expect(401);
  });

  it("healthz responds 200", async () => {
    await request(app.getHttpServer()).get("/healthz").expect(200);
  });
});
