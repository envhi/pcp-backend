import bcrypt, { hashSync } from "bcrypt";
import { userRepository } from "../repositories/userRepository";
import {
  ApiError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/api-error";
import { CreateUserInterface } from "../interfaces/create-user.interface";
import { Wallet } from "../entities/Wallet";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export class UserService {
  static async returnUserDataByToken(tokenData: any) {
    try {

      console.log(tokenData,' rabecao ')

      // return
      const token = tokenData.split(" ")[1];

      if (!token) {
        throw new UnauthorizedError("Token not provided");
      }

      type JwtPayload = {
        id: number;
      };

      const decoded = jwt.verify(
        String(token),
        String(process.env.SECRET) ?? ""
      ) as JwtPayload;

      console.log("decoded ----------------", decoded);

      const user = await UserService.findUserById(decoded.id);

      if (!user) {
        throw new NotFoundError("User not found");
      }

      console.log(user)

      const dataToFront = {
        userName: user.name,
        userBalance: user.wallet.balance,
        userEmail: user.email,
        userDocType: user.docType,
        userDoc: user.document
      }
      return dataToFront;


    } catch (error) {
      console.log(error)
    }
  }

  static async create(userData: CreateUserInterface) {
    console.log("chegou no service");
    console.log(userData);
    return await userRepository.save(userRepository.create(userData));
  }

  static async findAll() {
    return await userRepository.find({
      relations: ["wallet"],
    });
  }

  static async findUserById(id: number) {
    return await userRepository.findOne({
      where: { id },
      relations: ["wallet"],
    });
  }

  static async updatePasswordById(
    id: number,
    password: string,
    newPassword: string
  ) {
    console.log(password);

    const user = await userRepository.findOneBy({ id: id });

    console.log(user);

    if (!user) {
      throw new NotFoundError(`User not found with id ${id}`);
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw new UnauthorizedError("Invalid password");
    }

    user.password = hashSync(newPassword, 9);

    await userRepository.save(user);
    return newPassword;
  }

  static async delete(id: number) {
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundError(`Not found user with id ${id}`);
    }

    return await userRepository.delete(id);
  }
}
