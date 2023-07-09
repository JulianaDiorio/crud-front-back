import { MigrationInterface, QueryRunner } from "typeorm";

export class createUsers1688865676806 implements MigrationInterface {
    name = 'createUsers1688865676806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "avatar" character varying NOT NULL, "email" character varying(50) NOT NULL, "date_birth" character varying(10) NOT NULL, "password" character varying(120) NOT NULL, "isActive" boolean DEFAULT true, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
