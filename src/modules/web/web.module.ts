import { Module } from '@nestjs/common';
import { WebController } from './web.controller';
import { WebService } from './web.service';
import { InstitutionModule } from '../institution/institution.module';
import { ProfessionalModule } from '../professional/professional.module';

@Module({
  imports: [InstitutionModule, ProfessionalModule],
  controllers: [WebController],
  providers: [WebService],
})
export class WebModule {}
