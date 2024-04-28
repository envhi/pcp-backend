import { hashSync } from "bcrypt";
import bcrypt from "bcrypt";
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  JoinColumn,
  AfterInsert,
} from "typeorm";
import { DocTypeEnum } from "../enum/doc-type.enum";
import { Wallet } from "./Wallet";
import { walletRepository } from "../repositories/walletRepository";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: false, unique: true })
  email: string;

  @Column({
    name: "doc_type_enum",
    type: "enum",
    enum: DocTypeEnum,
  })
  docType: DocTypeEnum;

  @Column({ type: "text", nullable: false, unique: true })
  document: string;

  @Column({ type: "text", nullable: false })
  password: string;

  @OneToOne(() => Wallet)
  @JoinColumn({ name: "wallet_id" })
  wallet: Wallet;

  @BeforeInsert()
  passwordHash() {
    this.password = hashSync(this.password, 9);
  }

  @BeforeInsert()
  async userWallet() {
    if (!this.wallet) {
      const wallet = await walletRepository.save(walletRepository.create());
      this.wallet = wallet;
    }
  }
}
