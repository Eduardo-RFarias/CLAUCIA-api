import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordToInstitution1751973200000 implements MigrationInterface {
  name = 'AddPasswordToInstitution1751973200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`INSTITUTION\`
      ADD \`password\` varchar(255) NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`INSTITUTION\`
      DROP COLUMN \`password\`
    `);
  }
}
