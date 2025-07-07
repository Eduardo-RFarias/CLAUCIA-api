import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { Professional } from './entities/professional.entity';
import { Institution } from '../institution/entities/institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professional, Institution])],
  controllers: [ProfessionalController],
  providers: [ProfessionalService],
  exports: [ProfessionalService, TypeOrmModule],
})
export class ProfessionalModule {}
