import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_Sender_Id" })
  userSenderId: number;

  @Column({ name: "user_Receiver_Id" })
  userReceiverId: number;

  @Column()
  value: number;

  @CreateDateColumn({ name: "created_at" })
  date: Date;
}
