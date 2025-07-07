import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { Sample } from './entities/sample.entity';
import { Professional } from '../professional/entities/professional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sample, Professional])],
  controllers: [SampleController],
  providers: [SampleService],
  exports: [SampleService],
})
export class SampleModule {}
