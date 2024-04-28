import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { LoginInterface } from "../interfaces/login.interface";
import { bodyValidationLogin } from "../helpers/login-schema-yup";
import { bodyValidationTransaction } from "../helpers/transaction-schema-yup";
import { TransactionInterface } from "../interfaces/transaction.interface";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/api-error";
import { UserService } from "../service/userService";

export const transactionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let validatedData: TransactionInterface | undefined = undefined;
    console.log("chegou no middlware transaction");
    validatedData = await bodyValidationTransaction.validate(req.body);

    const userSender = await UserService.findUserById(req.body.userSenderId);

    const userReceiver = await UserService.findUserById(
      req.body.userReceiverId
    );

    if (!userSender) {
      throw new NotFoundError("User with sender id not found");
    }

    if (!userReceiver) {
      throw new NotFoundError("user with receiver id not found");
    }

    if (userSender.wallet.balance - req.body.value < 0) {
      throw new UnauthorizedError("sem saldo");
    }

    if (userSender.docType === "CNPJ") {
      throw new UnauthorizedError(
        "usuarios lojistas nao podem efetuar pagamento"
      );
    }

    if (req.body.userSenderId == req.body.userReceiverId) {
      throw new BadRequestError("Sender id equals the receiver Id");
    }

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
