import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712240836112 implements MigrationInterface {
    name = 'Default1712240836112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "user_Sender_Id"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "user_Receiver_Id"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "userSenderIr" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "userReceiverId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "userReceiverId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "userSenderIr"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "user_Receiver_Id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "user_Sender_Id" integer NOT NULL`);
    }

}
