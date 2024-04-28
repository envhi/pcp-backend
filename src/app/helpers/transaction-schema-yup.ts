import { TransactionInterface } from "./../interfaces/transaction.interface";
import * as yup from "yup";

export const bodyValidationTransaction: yup.Schema<TransactionInterface> = yup
  .object()
  .shape({
    userSenderId: yup.string().required(),
    userReceiverId: yup.string().required(),
    value: yup.string().required(),
  });
