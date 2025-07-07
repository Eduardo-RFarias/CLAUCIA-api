import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WoundService } from './wound.service';
import { WoundController } from './wound.controller';
import { Wound } from './entities/wound.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wound])],
  controllers: [WoundController],
  providers: [WoundService],
  exports: [WoundService],
})
export class WoundModule {}
