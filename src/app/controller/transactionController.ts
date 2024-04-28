import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { UserService } from "../service/userService";
import { ApiError } from "../helpers/api-error";
import { TransactionService } from "../service/transactionService";
export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    try {
      await TransactionService.executeTransaction(req.body);

    } catch (error) {
      console.log('error no controller', error)
      if (error instanceof ApiError) {
        console.log("error no controller / instance of apierror", error);
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ msg: "Internal Server Error" });
      }
    }

    return res.status(201).json({
      msg: `Transação no valor de R$${req.body.value},00 realizada`,
    });

  }
}

export const transactionController = new TransactionController();
