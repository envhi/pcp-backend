import { AppDataSource } from "../../data-source";
import { Wallet } from "../entities/Wallet";

export const walletRepository = AppDataSource.getRepository(Wallet);
