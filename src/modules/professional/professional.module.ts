import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { Professional } from './entities/professional.entity';
import { Institution } from '../institution/entities/institution.entity';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Professional, Institution]), SharedModule],
  controllers: [ProfessionalController],
  providers: [ProfessionalService],
  exports: [ProfessionalService, TypeOrmModule],
})
export class ProfessionalModule {}
