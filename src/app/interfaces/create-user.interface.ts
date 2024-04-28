import { DocTypeEnum } from "../enum/doc-type.enum";

export interface CreateUserInterface {
  name: string;
  email: string;
  docType: DocTypeEnum;
  document: string;
  password: string;
}
