import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingStaff1734865634806 implements MigrationInterface {
    name = 'CreatingStaff1734865634806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "staff" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "middleName" varchar NOT NULL, "type" text NOT NULL, "joinDate" datetime NOT NULL, "baseSalary" integer NOT NULL DEFAULT (1000))`);
        await queryRunner.query(`CREATE TABLE "staffRelations" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "supervisorId" integer, "subordinateId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_staffRelations" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "supervisorId" integer, "subordinateId" integer, CONSTRAINT "FK_5e9b74320f13c87318158ef219b" FOREIGN KEY ("supervisorId") REFERENCES "staff" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_18a3eba97dcde5f15f68203509b" FOREIGN KEY ("subordinateId") REFERENCES "staff" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_staffRelations"("id", "supervisorId", "subordinateId") SELECT "id", "supervisorId", "subordinateId" FROM "staffRelations"`);
        await queryRunner.query(`DROP TABLE "staffRelations"`);
        await queryRunner.query(`ALTER TABLE "temporary_staffRelations" RENAME TO "staffRelations"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staffRelations" RENAME TO "temporary_staffRelations"`);
        await queryRunner.query(`CREATE TABLE "staffRelations" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "supervisorId" integer, "subordinateId" integer)`);
        await queryRunner.query(`INSERT INTO "staffRelations"("id", "supervisorId", "subordinateId") SELECT "id", "supervisorId", "subordinateId" FROM "temporary_staffRelations"`);
        await queryRunner.query(`DROP TABLE "temporary_staffRelations"`);
        await queryRunner.query(`DROP TABLE "staffRelations"`);
        await queryRunner.query(`DROP TABLE "staff"`);
    }

}
