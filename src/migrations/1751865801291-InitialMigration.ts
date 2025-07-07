import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1751865801291 implements MigrationInterface {
  name = 'InitialMigration1751865801291';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`PROFESSIONAL\` (\`coren\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`photo\` varchar(255) NULL, PRIMARY KEY (\`coren\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`INTITUTION\` (\`name\` varchar(255) NOT NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`SAMPLE\` (\`id\` int NOT NULL AUTO_INCREMENT, \`photo\` varchar(255) NULL, \`ai_classification\` int NULL, \`professional_classification\` int NULL, \`height\` float NULL, \`width\` float NULL, \`date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`FK_WOUND_id\` int NOT NULL, \`FK_PROFESSIONAL_coren\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`WOUND\` (\`id\` int NOT NULL AUTO_INCREMENT, \`location\` varchar(255) NOT NULL, \`origin\` varchar(255) NOT NULL, \`FK_PATIENT_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`PATIENT\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`date_of_birth\` date NOT NULL, \`sex\` char(1) NOT NULL, \`photo\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`works\` (\`fk_PROFESSIONAL_coren\` varchar(255) NOT NULL, \`fk_INTITUTION_name\` varchar(255) NOT NULL, INDEX \`IDX_3a10ed65de327aed4fb62d5f1f\` (\`fk_PROFESSIONAL_coren\`), INDEX \`IDX_079e454b2aa3e377e58975c267\` (\`fk_INTITUTION_name\`), PRIMARY KEY (\`fk_PROFESSIONAL_coren\`, \`fk_INTITUTION_name\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`SAMPLE\` ADD CONSTRAINT \`FK_SAMPLE_WOUND_id\` FOREIGN KEY (\`FK_WOUND_id\`) REFERENCES \`WOUND\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`SAMPLE\` ADD CONSTRAINT \`FK_SAMPLE_PROFESSIONAL_coren\` FOREIGN KEY (\`FK_PROFESSIONAL_coren\`) REFERENCES \`PROFESSIONAL\`(\`coren\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`WOUND\` ADD CONSTRAINT \`FK_WOUND_PATIENT_id\` FOREIGN KEY (\`FK_PATIENT_id\`) REFERENCES \`PATIENT\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`works\` ADD CONSTRAINT \`FK_works_PROFESSIONAL_coren\` FOREIGN KEY (\`fk_PROFESSIONAL_coren\`) REFERENCES \`PROFESSIONAL\`(\`coren\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`works\` ADD CONSTRAINT \`FK_works_INTITUTION_name\` FOREIGN KEY (\`fk_INTITUTION_name\`) REFERENCES \`INTITUTION\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`works\` DROP FOREIGN KEY \`FK_works_INTITUTION_name\``);
    await queryRunner.query(`ALTER TABLE \`works\` DROP FOREIGN KEY \`FK_works_PROFESSIONAL_coren\``);
    await queryRunner.query(`ALTER TABLE \`WOUND\` DROP FOREIGN KEY \`FK_WOUND_PATIENT_id\``);
    await queryRunner.query(`ALTER TABLE \`SAMPLE\` DROP FOREIGN KEY \`FK_SAMPLE_PROFESSIONAL_coren\``);
    await queryRunner.query(`ALTER TABLE \`SAMPLE\` DROP FOREIGN KEY \`FK_SAMPLE_WOUND_id\``);
    await queryRunner.query(`DROP INDEX \`IDX_079e454b2aa3e377e58975c267\` ON \`works\``);
    await queryRunner.query(`DROP INDEX \`IDX_3a10ed65de327aed4fb62d5f1f\` ON \`works\``);
    await queryRunner.query(`DROP TABLE \`works\``);
    await queryRunner.query(`DROP TABLE \`PATIENT\``);
    await queryRunner.query(`DROP TABLE \`WOUND\``);
    await queryRunner.query(`DROP TABLE \`SAMPLE\``);
    await queryRunner.query(`DROP TABLE \`INTITUTION\``);
    await queryRunner.query(`DROP TABLE \`PROFESSIONAL\``);
  }
}
