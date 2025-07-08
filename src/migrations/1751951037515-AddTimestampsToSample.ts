import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTimestampsToSample1751951037515 implements MigrationInterface {
  name = 'AddTimestampsToSample1751951037515';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`SAMPLE\`
      ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    `);
    await queryRunner.query(`
      ALTER TABLE \`SAMPLE\`
      ADD \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`SAMPLE\`
      DROP COLUMN \`updated_at\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`SAMPLE\`
      DROP COLUMN \`created_at\`
    `);
  }
}
