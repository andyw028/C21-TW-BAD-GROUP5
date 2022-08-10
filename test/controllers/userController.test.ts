import { UserController } from "../../controllers/UserController";
import { UserServices } from "../../services/UserServices";
import { checkPassword } from "../../utils/hash";
import type { Request, Response } from "express";
import type { Knex } from "knex";
import { createRequest, createResponse } from "../helper";

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
      Promise.resolve({ id: 1, username: "admin", password: "1234", firstName: "Sam", lastName: "Chan", email: "samchan@tecky.io" })
    );

    req = createRequest();
    res = createResponse();

    (checkPassword as jest.Mock).mockResolvedValue(true);
    controller = new UserController(service);
  });

  it("login test - missing username", async () => {
    req.body = { password: "1234"};

    await controller.login(req, res);

    expect(res.status).lastCalledWith(401);
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
    const username = "jason";
    const password = "1234";

    req.body = { username, password };
    await controller.login(req, res);

    expect(service.getUserByUsername).toBeCalledWith(username);
    expect(checkPassword).toBeCalledWith(password, "hashedPassword");
    expect(req.session.user).toEqual({ id: 1 });
    expect(res.json).toBeCalledWith({ message: "Login successfully" });
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
    expect(res.json).lastCalledWith({ message: "Missing important data" });
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
    expect(res.json).lastCalledWith({ message: "Username already exists" });
    expect(res.json).toBeCalledTimes(1);
  });

  it("signup test - duplicate email", async () => {
    const username = "john";
    const password = "1234";
    const firstName = "John";
    const lastName = "Leung";
    const email = "samchan@tecky.io"

    req.body = { username, password, firstName, lastName, email };
    await controller.signup(req, res);

    expect(res.status).lastCalledWith(400);
    expect(res.json).lastCalledWith({ message: "Email already exists" });
    expect(res.json).toBeCalledTimes(1);
  });

//   it("signup test - success", async () => {
//     const username = "roy";
//     const password = "1234";
//     const firstName = "Roy";
//     const lastName = "Chan";
//     const email = "roychan@tecky.io"

//     req.body = { username, password, firstName, lastName, email };
//     await controller.signup(req, res);

//   });

  // it("test login - internal server error", () => {});
});