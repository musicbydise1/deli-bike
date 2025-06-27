import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../../src/app.module";

describe("AccessoriesController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("/accessories (GET)", async () => {
    const response = await request(app.getHttpServer()).get("/accessories");
    expect(response.status).toBe(200);
    expect(response.body.isSuccess).toBe(true);
  });
});
