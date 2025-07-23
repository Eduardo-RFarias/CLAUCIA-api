import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sample } from './entities/sample.entity';
import { CreateSampleDto, UpdateSampleDto } from './dto';
import { Professional } from '../professional/entities/professional.entity';
import { UploadService } from '../../shared/services/upload/upload.service';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
    private readonly uploadService: UploadService,
  ) {}

  async create(createSampleDto: CreateSampleDto): Promise<Sample> {
    const professional = await this.professionalRepository.findOne({
      where: { coren: createSampleDto.professional_coren },
    });

    if (!professional) {
      throw new NotFoundException(`Professional with COREN "${createSampleDto.professional_coren}" not found`);
    }

    // Handle photo upload if provided
    if (createSampleDto.photo) {
      const photoUrl = await this.uploadService.uploadFile(createSampleDto.photo);
      createSampleDto.photo = photoUrl;
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
      where: { wound_id: woundId },
    });
  }

  async update(id: number, updateSampleDto: UpdateSampleDto): Promise<Sample> {
    const sample = await this.findOne(id);

    // Handle photo upload if provided
    if (updateSampleDto.photo) {
      // Delete old photo if exists
      if (sample.photo) {
        await this.uploadService.deleteFile(sample.photo);
      }

      const photoUrl = await this.uploadService.uploadFile(updateSampleDto.photo);
      updateSampleDto.photo = photoUrl;
    }

    Object.assign(sample, updateSampleDto);
    return await this.sampleRepository.save(sample);
  }

  async remove(id: number): Promise<void> {
    const sample = await this.findOne(id);

    // Delete associated photo file if exists
    if (sample.photo) {
      await this.uploadService.deleteFile(sample.photo);
    }

    await this.sampleRepository.remove(sample);
  }
}
