import request from "supertest";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import { mockedUser } from "../mocks/user.mocks";
import { describe } from "node:test";
import { expect, jest, test, beforeAll, afterAll } from "@jest/globals";

describe("/users", () => {
  let connection: DataSource;
  const baseUrl = "/users";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /user - Must be able to create a user", async () => {
    const response = await request(app).post(baseUrl).send({
      name: "Ana",
      email: "ana@mail.com",
      date_birth: "1992-10-21",
      password: "123456",
      avatar: "124555884545",
      isActive: true,
    });
    console.log(response);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).not.toHaveProperty("password");
  });

  test("PATCH /users/:id -  should be able to update user", async () => {
    const newValue = { name: "Antônio" };

    const userLoginResp = await request(app).post("/login").send({
      email: "ana@mail.com",
      password: "123456",
    });

    const token = `Bearer ${userLoginResp.body.token}`;

    const userTobeUpdateReq = await request(app)
      .get(baseUrl)
      .set("Authorization", token);
    const userTobeUpdateId = userTobeUpdateReq.body.id;

    const response = await request(app)
      .patch(`${baseUrl}/${userTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValue);
    const userUpdated = await request(app)
      .get(baseUrl)
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(userUpdated.body.name).toEqual("Antônio");
    expect(userUpdated.body).not.toHaveProperty("password");
  });

  test("DELETE /users/:id -  Must be able to soft delete user", async () => {
    const userLoginResp = await request(app).post("/login").send(mockedUser);

    const token = `Bearer ${userLoginResp.body.token}`;

    const userTobeDeleted = await request(app)
      .get(baseUrl)
      .set("Authorization", token);

    const response = await request(app)
      .delete(`${baseUrl}/${userTobeDeleted.body.id}`)
      .set("Authorization", token);

    const findUser = await request(app)
      .get("/users")
      .set("Authorization", token);
    expect(response.status).toBe(204);
  });
});
