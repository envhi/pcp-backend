import bcrypt, { hashSync } from "bcrypt";
import { walletRepository } from "../repositories/walletRepository";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/api-error";
import { CreateUserInterface } from "../interfaces/create-user.interface";

export class WalletService {
  static async create(userData: CreateUserInterface) {
    return await walletRepository.save(walletRepository.create());
  }

  static async findAll() {
    return await walletRepository.find();
  }

  static async findWalletById(id: number) {
    return await walletRepository.findOne({
      where: { id },
    });
  }

  static async delete(id: number) {
    // const user = await this.findUserById(id);
    // if (!user) {
    //   throw new NotFoundError(`Not found user with id ${id}`);
    // }
    // return await walletRepository.delete(id);
  }
}
