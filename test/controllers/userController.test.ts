import { UserController } from "../../controllers/UserController";
import { UserServices } from "../../services/UserServices";
import { checkPassword } from "../../utils/hash";
import { hashPassword } from "../../utils/hash";

import type { Request, Response } from "express";
import type { Knex } from "knex";
import { createRequest, createResponse } from "../helper";
import { knex } from "../../tools/knexConfig";

jest.mock("../../services/UserServices");
jest.mock("../../utils/hash");

describe("UserController", () => {
  let controller: UserController;
  let service: UserServices;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    service = new UserServices({} as Knex);
    service.getUserByUsername = jest.fn(() =>
      Promise.resolve({ id: 1, username: "admin", password: "hashedPassword" })
    );

    req = createRequest();
    res = createResponse();

    (checkPassword as jest.Mock).mockResolvedValue(true);
    controller = new UserController(service);

    service.addUser = jest.fn(() =>
      Promise.resolve({ id: 1, username: "admin", password: "1234", firstName: "Sam", lastName: "Chan", email: "samchan@tecky.io" })
    );

    (hashPassword as jest.Mock).mockResolvedValue(true);
    controller = new UserController(service);

  });

  it("login test - missing username", async () => {
    req.body = { password: "1234"};

    await controller.login(req, res);

    expect(res.status).lastCalledWith(400);
    expect(res.json).lastCalledWith({ message: "Invalid username or password" });
    expect(res.json).toBeCalledTimes(1);
  });

  it("login test - missing password", async () => {
    req.body = { username: "1234" };

    await controller.login(req, res);

    expect(res.status).lastCalledWith(400);
    expect(res.json).lastCalledWith({ message: "Invalid username or password" });
    expect(res.json).toBeCalledTimes(1);
  });

  it("login test - success", async () => {
    const username = "admin";
    const password = "1234";

    req.body = { username, password };
    await controller.login(req, res);

    expect(service.getUserByUsername).toBeCalledWith(username);
    expect(checkPassword).toBeCalledWith(password, "hashedPassword");
    expect(req.session.user).toEqual({ id: 1, username: username });
    expect(res.json).toBeCalledWith({success: true, message: "Login successfully" });
  });

  it("signup test - missing username", async () => {
    const username = "";
    const password = "1234";
    const firstName = "John";
    const lastName = "Leung";
    const email = "johnleung@tecky.io"

    req.body = { username, password, firstName, lastName, email };
    await controller.signup(req, res);

    expect(res.status).lastCalledWith(400);
    expect(res.json).lastCalledWith({ success: false, message: "Missing important data" });
    expect(res.json).toBeCalledTimes(1);
  });


  it("signup test - duplicate username", async () => {
    const username = "admin";
    const password = "1234";
    const firstName = "John";
    const lastName = "Leung";
    const email = "johnleung@tecky.io"

    req.body = { username, password, firstName, lastName, email };
    await controller.signup(req, res);

    expect(res.status).lastCalledWith(400);
    expect(res.json).lastCalledWith({ success: false, message: "Username already exists" });
    expect(res.json).toBeCalledTimes(1);
  });


  it("signup test - success", async () => {
    const username = "roy";
    const password = "1234";
    const firstName = "Roy";
    const lastName = "Chan";
    const email = "roychan@tecky.io"

    req.body = { username, password, firstName, lastName, email };
    await controller.signup(req, res);

    expect(service.addUser).toBeCalledWith(username, password, firstName, lastName, email);
    expect(hashPassword).toBeCalledWith(password);
    // expect(req.session.user).toEqual({ id: user.id, username});

    expect(res.status).lastCalledWith(200);
    expect(res.json).lastCalledWith({ success: true, message: "Account created successfully" });
    expect(res.json).toBeCalledTimes(1);

  });

  afterAll(async () => {
    await knex.destroy();
  });

});