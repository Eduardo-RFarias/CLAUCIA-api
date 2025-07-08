import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionAndTimestampsToWound1751949816072 implements MigrationInterface {
  name = 'AddDescriptionAndTimestampsToWound1751949816072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`WOUND\`
      ADD \`description\` varchar(1024) NULL
    `);
    await queryRunner.query(`
      ALTER TABLE \`WOUND\`
      ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    `);
    await queryRunner.query(`
      ALTER TABLE \`WOUND\`
      ADD \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`WOUND\`
      DROP COLUMN \`updated_at\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`WOUND\`
      DROP COLUMN \`created_at\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`WOUND\`
      DROP COLUMN \`description\`
    `);
  }
}
