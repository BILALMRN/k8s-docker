import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateAdminTable1704285042270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "admins" (
            "admin_id" SERIAL NOT NULL PRIMARY KEY,
            "username" VARCHAR(50) NOT NULL UNIQUE,
            "password_hash" CHAR(64) NOT NULL,
            "first_name" VARCHAR(100) NOT NULL,
            "last_name" VARCHAR(100) NOT NULL,
            "email" VARCHAR(255) NOT NULL,
            "urlPhotoProfile" VARCHAR(200),
            "coverPhoto" VARCHAR(200),
            "phone" VARCHAR(20),
            "address" VARCHAR(255),
            "city" VARCHAR(100),
            "zip" VARCHAR(10),
            "country" VARCHAR(100),
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
          )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admins"`);
    }

}

