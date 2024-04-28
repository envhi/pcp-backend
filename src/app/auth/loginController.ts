import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { loginService } from "./loginService";
import { ApiError, UnauthorizedError } from "../helpers/api-error";
import { UserService } from "../service/userService";
export class LoginController {
  async login(req: Request, res: Response) {
    try {
      const token = await loginService.login(req.body);
      console.log(token)
      return res.json({msg: 'Logged in successfully', token });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json({ msg: "Internal Server Error" });
      }
    }
  }

  async profile(req: Request, res: Response) {
    res.json(req.user);
  }
}

export const loginController = new LoginController();
