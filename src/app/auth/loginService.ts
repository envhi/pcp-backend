import bcrypt, { hashSync } from "bcrypt";
import jwt from 'jsonwebtoken'
import { userRepository } from "../repositories/userRepository";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/api-error";
import { LoginInterface } from "../interfaces/login.interface";

export class loginService {
  static async login(data: LoginInterface) {

    if(!data.email || !data.password) {
      return new BadRequestError('Bad Request')
    }

    console.log('from login service: ' + data.email, data.password);

    const user = await userRepository.findOneBy({ email: data.email });

    console.log('xd1')
    if (!user) {
      throw new NotFoundError("User not found xd");
    }


    const matchPassword = await bcrypt.compare(data.password, user.password);
    console.log('xd2')

    if (!matchPassword) {
      throw new UnauthorizedError("Invalid password");
    }

    console.log('xd3')


    return jwt.sign({ id: user.id }, process.env.SECRET ?? "", {
      expiresIn: "1d",
    });
  }
}
