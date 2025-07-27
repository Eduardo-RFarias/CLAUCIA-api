import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordToInstitution1753589508746 implements MigrationInterface {
  name = 'AddPasswordToInstitution1753589508746';

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
