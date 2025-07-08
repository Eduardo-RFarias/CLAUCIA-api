import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTimestampsToProfessionalAndInstitution1751951596348 implements MigrationInterface {
  name = 'AddTimestampsToProfessionalAndInstitution1751951596348';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`PROFESSIONAL\`
      ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    `);
    await queryRunner.query(`
      ALTER TABLE \`PROFESSIONAL\`
      ADD \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    `);
    await queryRunner.query(`
      ALTER TABLE \`INSTITUTION\`
      ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    `);
    await queryRunner.query(`
      ALTER TABLE \`INSTITUTION\`
      ADD \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`INSTITUTION\`
      DROP COLUMN \`updated_at\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`INSTITUTION\`
      DROP COLUMN \`created_at\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`PROFESSIONAL\`
      DROP COLUMN \`updated_at\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`PROFESSIONAL\`
      DROP COLUMN \`created_at\`
    `);
  }
}
