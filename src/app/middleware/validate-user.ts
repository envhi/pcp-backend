import { Request, Response, NextFunction } from "express";
import { bodyValidation } from "../helpers/user-schema-yup";
import * as yup from "yup";
import { CreateUserInterface } from "../interfaces/create-user.interface";

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let validatedData: CreateUserInterface | undefined = undefined;
    console.log("chegou no middlware");
    validatedData = await bodyValidation.validate(req.body);

    console.log("middleware validou");

    next();
  } catch (error) {
    const yupError = error as yup.ValidationError;
    res.status(400).json({
      errors: {
        default: yupError.message,
      },
    });
  }
};
