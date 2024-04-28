import { DocTypeEnum } from "../enum/doc-type.enum";
import { CreateUserInterface } from "../interfaces/create-user.interface";
import * as yup from "yup";

export const bodyValidation: yup.Schema<CreateUserInterface> = yup
  .object()
  .shape({
    name: yup.string().required().min(5),
    email: yup.string().required().email(),
    docType: yup
      .mixed<DocTypeEnum>()
      .oneOf(Object.values(DocTypeEnum))
      .required(),
    document: yup.string().required().min(11),
    password: yup.string().required().min(10),
  });
