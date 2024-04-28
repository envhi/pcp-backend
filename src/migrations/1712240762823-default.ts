import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712240762823 implements MigrationInterface {
    name = 'Default1712240762823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "value" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "value" numeric(5,2) NOT NULL DEFAULT '0'`);
    }

}
