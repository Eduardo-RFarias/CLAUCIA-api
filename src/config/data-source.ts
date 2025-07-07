import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Institution } from '../modules/institution/entities/institution.entity';
import { Professional } from '../modules/professional/entities/professional.entity';
import { Patient } from '../modules/patient/entities/patient.entity';
import { Wound } from '../modules/wound/entities/wound.entity';
import { Sample } from '../modules/sample/entities/sample.entity';

// Load environment variables
config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: configService.get('MYSQL_HOST', 'localhost'),
  port: configService.get('MYSQL_PORT', 3306),
  username: configService.get('MYSQL_USERNAME', 'claucia'),
  password: configService.get('MYSQL_PASSWORD', 'claucia'),
  database: configService.get('MYSQL_DATABASE', 'claucia'),
  entities: [Institution, Professional, Patient, Wound, Sample],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: false,
});
