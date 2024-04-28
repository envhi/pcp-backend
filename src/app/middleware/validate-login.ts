import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { LoginInterface } from "../interfaces/login.interface";
import { bodyValidationLogin } from "../helpers/login-schema-yup";

export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let validatedData: LoginInterface | undefined = undefined;
    console.log("chegou no middlware login");
    validatedData = await bodyValidationLogin.validate(req.body);

    console.log("middleware validou login");

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
