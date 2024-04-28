import { Request, Response } from "express";
import { WalletService } from "../service/walletService";

export class WalletController {
  async create(req: Request, res: Response) {
    // const newUser = await UserService.create(req.body);
    // return res.status(201).json({ newUser });
  }

  async findAll(req: Request, res: Response) {
    const allWallets = await WalletService.findAll();

    return res.status(200).json({ allWallets });
  }

  async findWalletById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const wallet = await WalletService.findWalletById(id);

    return res.status(200).json({ wallet });
  }

  async deleteById(req: Request, res: Response) {
    // await UserService.delete(Number(req.params.id));
    // return res.status(200).json();
  }
}

export const walletController = new WalletController();
