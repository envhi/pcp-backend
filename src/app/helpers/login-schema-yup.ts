import * as yup from "yup";
import { LoginInterface } from "../interfaces/login.interface";

export const bodyValidationLogin: yup.Schema<LoginInterface> = yup
  .object()
  .shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(10),
  });
