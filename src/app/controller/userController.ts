import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { UserService } from "../service/userService";
import { ApiError } from "../helpers/api-error";
export class UserController {
  async returnUserDataByToken(req: Request, res: Response) {

    const userData = await UserService.returnUserDataByToken(req.headers.authorization);

    return res.json(userData);
  }

  async create(req: Request, res: Response) {
    console.log("chegou no controller");
    const newUser = await UserService.create(req.body);

    return res.status(201).json({ newUser });
  }

  async findAll(req: Request, res: Response) {
    const allUsers = await UserService.findAll();

    return res.status(200).json({ allUsers });
  }

  async findUserById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const user = await UserService.findUserById(id);

    return res.status(200).json({ user });
  }

  async updatePasswordById(req: Request, res: Response) {
    const id = req.params.id;
    const { password, newPassword } = req.body;
    try {
      const updatedPassword = await UserService.updatePasswordById(
        Number(id),
        password,
        newPassword
      );

      return res
        .status(200)
        .json({ msg: "Password updated", newPassword: updatedPassword });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json({ msg: "Internal Server Error" });
      }
    }
  }

  async deleteById(req: Request, res: Response) {
    await UserService.delete(Number(req.params.id));

    return res.status(200).json();
  }
}

export const userController = new UserController();
