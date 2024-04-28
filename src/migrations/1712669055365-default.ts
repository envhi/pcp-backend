import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712669055365 implements MigrationInterface {
    name = 'Default1712669055365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_96aac72f1574b88752e9fb00089"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "user_id" TO "wallet_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_67abb81dc33e75d1743323fd5db" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_67abb81dc33e75d1743323fd5db"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "wallet_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_96aac72f1574b88752e9fb00089" FOREIGN KEY ("user_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
