import { connect } from "ts-postgres";
import {
  ApiError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/api-error";
import { UserService } from "./userService";
import { transactionRepository } from "../repositories/transactionRepository";
import { TransactionInterface } from "../interfaces/transaction.interface";
import axios from "axios";

const port = process.env.DB_PORT as number | undefined;

export class TransactionService {
  static async executeTransaction(transactionData: TransactionInterface) {
    const client = await connect({
      host: process.env.DB_HOST,
      port: port,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    try {
      await client.query("BEGIN");

      await client.query(
        `UPDATE wallets SET balance = balance - ${parseInt(
          transactionData.value
        )} FROM users WHERE wallets.id = users.wallet_id AND users.id = ${
          transactionData.userSenderId
        };`
      );

      await client.query(
        `UPDATE wallets SET balance = balance + ${parseInt(
          transactionData.value
        )} FROM users WHERE wallets.id = users.wallet_id AND users.id = ${
          transactionData.userReceiverId
        };`
      );

      await transactionRepository.save(
        transactionRepository.create(transactionData)
      );

      const consult = await axios
        .get("https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc")
        .then((response) => {
          const responseDataMessage = response.data.message;
          if (responseDataMessage === "Autorizado") {
            console.log("Authorized transaction");
          } else {
            throw new UnauthorizedError("Unauthorized transaction");
          }
        });

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      console.log("rolbeckou xddd");
      throw new UnauthorizedError('Unauthorized transaction')
    } finally {
      await client.end();
      console.log('client ended')
    }
  }
}
