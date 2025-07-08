import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMedicalConditionsAndTimestampsToPatient1751949026849 implements MigrationInterface {
  name = 'AddMedicalConditionsAndTimestampsToPatient1751949026849';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`PATIENT\`
      ADD \`medical_conditions\` varchar(1024) NULL
    `);
    await queryRunner.query(`
      ALTER TABLE \`PATIENT\`
      ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    `);
    await queryRunner.query(`
      ALTER TABLE \`PATIENT\`
      ADD \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`PATIENT\`
      DROP COLUMN \`updated_at\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`PATIENT\`
      DROP COLUMN \`created_at\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`PATIENT\`
      DROP COLUMN \`medical_conditions\`
    `);
  }
}
