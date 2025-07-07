import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wound } from './entities/wound.entity';
import { CreateWoundDto, UpdateWoundDto } from './dto';

@Injectable()
export class WoundService {
  constructor(
    @InjectRepository(Wound)
    private readonly woundRepository: Repository<Wound>,
  ) {}

  async create(createWoundDto: CreateWoundDto): Promise<Wound> {
    const wound = this.woundRepository.create(createWoundDto);
    return await this.woundRepository.save(wound);
  }

  async findAll(): Promise<Wound[]> {
    return await this.woundRepository.find();
  }

  async findOne(id: number): Promise<Wound> {
    const wound = await this.woundRepository.findOne({
      where: { id },
    });

    if (!wound) {
      throw new NotFoundException(`Wound with ID "${id}" not found`);
    }

    return wound;
  }

  async findByPatient(patientId: number): Promise<Wound[]> {
    return await this.woundRepository.find({
      where: { patientId },
    });
  }

  async update(id: number, updateWoundDto: UpdateWoundDto): Promise<Wound> {
    const wound = await this.findOne(id);
    Object.assign(wound, updateWoundDto);
    return await this.woundRepository.save(wound);
  }

  async remove(id: number): Promise<void> {
    const wound = await this.findOne(id);
    await this.woundRepository.remove(wound);
  }
}
