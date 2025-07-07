import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1751863884381 implements MigrationInterface {
  name = 'InitialMigration1751863884381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`PROFESSIONAL\` (
        \`coren\` varchar(255) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`photo\` varchar(255) NULL,
        CONSTRAINT \`PK_PROFESSIONAL_coren\` PRIMARY KEY (\`coren\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE \`INTITUTION\` (
        \`name\` varchar(255) NOT NULL,
        CONSTRAINT \`PK_INTITUTION_name\` PRIMARY KEY (\`name\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE \`works\` (
        \`fk_PROFESSIONAL_coren\` varchar(255) NOT NULL,
        \`fk_INTITUTION_name\` varchar(255) NOT NULL,
        INDEX \`IDX_works_PROFESSIONAL_coren\` (\`fk_PROFESSIONAL_coren\`),
        INDEX \`IDX_works_INTITUTION_name\` (\`fk_INTITUTION_name\`),
        CONSTRAINT \`PK_works_composite\` PRIMARY KEY (\`fk_PROFESSIONAL_coren\`, \`fk_INTITUTION_name\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      ALTER TABLE \`works\` 
      ADD CONSTRAINT \`FK_works_PROFESSIONAL\` 
      FOREIGN KEY (\`fk_PROFESSIONAL_coren\`) 
      REFERENCES \`PROFESSIONAL\`(\`coren\`) 
      ON DELETE CASCADE ON UPDATE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE \`works\` 
      ADD CONSTRAINT \`FK_works_INTITUTION\` 
      FOREIGN KEY (\`fk_INTITUTION_name\`) 
      REFERENCES \`INTITUTION\`(\`name\`) 
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`works\` 
      DROP FOREIGN KEY \`FK_works_INTITUTION\`
    `);

    await queryRunner.query(`
      ALTER TABLE \`works\` 
      DROP FOREIGN KEY \`FK_works_PROFESSIONAL\`
    `);

    await queryRunner.query(`
      DROP INDEX \`IDX_works_INTITUTION_name\` ON \`works\`
    `);

    await queryRunner.query(`
      DROP INDEX \`IDX_works_PROFESSIONAL_coren\` ON \`works\`
    `);

    await queryRunner.query(`DROP TABLE \`works\``);
    await queryRunner.query(`DROP TABLE \`INTITUTION\``);
    await queryRunner.query(`DROP TABLE \`PROFESSIONAL\``);
  }
}
