import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {
  ApiError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/api-error";
import { UserService } from "../service/userService";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new UnauthorizedError("Token not provided");
    }

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("Token not provided");
    }

    type JwtPayload = {
      id: number;
    };

    const decoded = jwt.verify(
      String(token),
      String(process.env.SECRET) ?? ""
    ) as JwtPayload;

    const user = await UserService.findUserById(decoded.id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const { ...loggedUser } = user;

    req.user = loggedUser;

    return next();
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.message);
    } else if (error instanceof JsonWebTokenError) {
      console.log(error.message);
      res.status(500).json(error.message);
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
};
