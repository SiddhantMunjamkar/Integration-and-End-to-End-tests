import { describe, expect, it, beforeAll } from "vitest";
import { app } from "..";
import request from "supertest";
import { resetDB } from "./helpers/reset-db";

describe("POST /sum", () => {
  beforeAll(async () => {
    console.log("clearing db");
    await resetDB();
  });

  it("should sum add 2 numbers", async () => {
    const { status, body } = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });
    expect(status).toBe(200);
    expect(body).toEqual({ result: 3, id: expect.any(Number) });

    const id = body.id;
    const result = await request(app).get(`/request?id=${id}`);

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: expect.any(Number),
      a: expect.any(Number),
    });
  });
});
