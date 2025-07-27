import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { Institution } from './entities/institution.entity';
import { CreateInstitutionDto, UpdateInstitutionDto } from './dto';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  async create(createInstitutionDto: CreateInstitutionDto): Promise<Institution> {
    const existingInstitution = await this.institutionRepository.findOne({
      where: { name: createInstitutionDto.name },
    });

    if (existingInstitution) {
      throw new ConflictException(`Institution with name "${createInstitutionDto.name}" already exists`);
    }

    // Hash password with argon2
    const hashedPassword = await argon2.hash(createInstitutionDto.password);

    const institution = this.institutionRepository.create({
      ...createInstitutionDto,
      password: hashedPassword,
    });
    return await this.institutionRepository.save(institution);
  }

  async findAll(): Promise<Institution[]> {
    return await this.institutionRepository.find({
      relations: ['professionals'],
    });
  }

  async findOne(name: string): Promise<Institution> {
    const institution = await this.institutionRepository.findOne({
      where: { name },
      relations: ['professionals'],
    });

    if (!institution) {
      throw new NotFoundException(`Institution with name "${name}" not found`);
    }

    return institution;
  }

  async update(name: string, updateInstitutionDto: UpdateInstitutionDto): Promise<Institution> {
    const institution = await this.findOne(name);

    // If updating name, check for conflicts
    if (updateInstitutionDto.name && updateInstitutionDto.name !== name) {
      const existingInstitution = await this.institutionRepository.findOne({
        where: { name: updateInstitutionDto.name },
      });

      if (existingInstitution) {
        throw new ConflictException(`Institution with name "${updateInstitutionDto.name}" already exists`);
      }
    }

    Object.assign(institution, updateInstitutionDto);
    return await this.institutionRepository.save(institution);
  }

  async findByProfessional(professionalCoren: string): Promise<Institution[]> {
    return await this.institutionRepository
      .createQueryBuilder('institution')
      .innerJoin('institution.professionals', 'professional')
      .where('professional.coren = :coren', { coren: professionalCoren })
      .getMany();
  }

  async remove(name: string): Promise<void> {
    const institution = await this.findOne(name);
    await this.institutionRepository.remove(institution);
  }

  async findByNameWithPassword(name: string): Promise<Institution> {
    const institution = await this.institutionRepository.findOne({
      where: { name },
      relations: ['professionals'],
      select: ['name', 'password'], // Explicitly include password
    });

    if (!institution) {
      throw new NotFoundException(`Institution with name "${name}" not found`);
    }

    return institution;
  }

  async verifyPassword(name: string, password: string): Promise<boolean> {
    const institution = await this.findByNameWithPassword(name);
    return await argon2.verify(institution.password, password);
  }
}
