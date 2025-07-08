import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sample } from './entities/sample.entity';
import { CreateSampleDto, UpdateSampleDto } from './dto';
import { Professional } from '../professional/entities/professional.entity';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
  ) {}

  async create(createSampleDto: CreateSampleDto): Promise<Sample> {
    const professional = await this.professionalRepository.findOne({
      where: { coren: createSampleDto.professional_coren },
    });

    if (!professional) {
      throw new NotFoundException(`Professional with COREN "${createSampleDto.professional_coren}" not found`);
    }

    const sample = this.sampleRepository.create({
      ...createSampleDto,
      professional: professional,
    });

    return await this.sampleRepository.save(sample);
  }

  async findAll(): Promise<Sample[]> {
    return await this.sampleRepository.find();
  }

  async findOne(id: number): Promise<Sample> {
    const sample = await this.sampleRepository.findOne({
      where: { id },
    });

    if (!sample) {
      throw new NotFoundException(`Sample with ID "${id}" not found`);
    }

    return sample;
  }

  async findByWound(woundId: number): Promise<Sample[]> {
    return await this.sampleRepository.find({
      where: { woundId },
    });
  }

  async update(id: number, updateSampleDto: UpdateSampleDto): Promise<Sample> {
    const sample = await this.findOne(id);
    Object.assign(sample, updateSampleDto);
    return await this.sampleRepository.save(sample);
  }

  async remove(id: number): Promise<void> {
    const sample = await this.findOne(id);
    await this.sampleRepository.remove(sample);
  }
}
