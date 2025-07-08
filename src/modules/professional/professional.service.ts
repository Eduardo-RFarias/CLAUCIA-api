import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as argon2 from 'argon2';
import { Professional } from './entities/professional.entity';
import { Institution } from '../institution/entities/institution.entity';
import { CreateProfessionalDto, UpdateProfessionalDto } from './dto';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  async create(createProfessionalDto: CreateProfessionalDto): Promise<Professional> {
    const existingProfessional = await this.professionalRepository.findOne({
      where: { coren: createProfessionalDto.coren },
    });

    if (existingProfessional) {
      throw new ConflictException(`Professional with COREN "${createProfessionalDto.coren}" already exists`);
    }

    // Hash password with argon2
    const hashedPassword = await argon2.hash(createProfessionalDto.password);

    // Handle institutions relationship
    let institutions: Institution[] = [];
    if (createProfessionalDto.institution_names && createProfessionalDto.institution_names.length > 0) {
      institutions = await this.institutionRepository.find({
        where: { name: In(createProfessionalDto.institution_names) },
      });

      // Check if all institutions were found
      const foundNames = institutions.map((inst) => inst.name);
      const notFoundNames = createProfessionalDto.institution_names.filter((name) => !foundNames.includes(name));

      if (notFoundNames.length > 0) {
        throw new NotFoundException(`Institutions not found: ${notFoundNames.join(', ')}`);
      }
    }

    const professional = this.professionalRepository.create({
      ...createProfessionalDto,
      password: hashedPassword,
      institutions,
    });

    return await this.professionalRepository.save(professional);
  }

  async findAll(): Promise<Professional[]> {
    return await this.professionalRepository.find();
  }

  async findOne(coren: string): Promise<Professional> {
    const professional = await this.professionalRepository.findOne({
      where: { coren },
    });

    if (!professional) {
      throw new NotFoundException(`Professional with COREN "${coren}" not found`);
    }

    return professional;
  }

  async findByCorenWithPassword(coren: string): Promise<Professional> {
    const professional = await this.professionalRepository.findOne({
      where: { coren },
      relations: ['institutions'],
      select: ['coren', 'password', 'name', 'photo'], // Explicitly include password
    });

    if (!professional) {
      throw new NotFoundException(`Professional with COREN "${coren}" not found`);
    }

    return professional;
  }

  async update(coren: string, updateProfessionalDto: UpdateProfessionalDto): Promise<Professional> {
    const professional = await this.findOne(coren);

    // Hash password if provided using argon2
    if (updateProfessionalDto.password) {
      updateProfessionalDto.password = await argon2.hash(updateProfessionalDto.password);
    }

    // Handle institutions relationship update
    if (updateProfessionalDto.institution_names !== undefined) {
      if (updateProfessionalDto.institution_names.length > 0) {
        const institutions = await this.institutionRepository.find({
          where: { name: In(updateProfessionalDto.institution_names) },
        });

        // Check if all institutions were found
        const foundNames = institutions.map((inst) => inst.name);
        const notFoundNames = updateProfessionalDto.institution_names.filter((name) => !foundNames.includes(name));

        if (notFoundNames.length > 0) {
          throw new NotFoundException(`Institutions not found: ${notFoundNames.join(', ')}`);
        }

        professional.institutions = institutions;
      } else {
        professional.institutions = [];
      }

      // Remove institution_names from the DTO as it's not a direct property
      const updateData = { ...updateProfessionalDto };
      delete updateData.institution_names;
      Object.assign(professional, updateData);
    } else {
      // Remove institution_names from the DTO as it's not a direct property
      const updateData = { ...updateProfessionalDto };
      delete updateData.institution_names;
      Object.assign(professional, updateData);
    }

    return await this.professionalRepository.save(professional);
  }

  async remove(coren: string): Promise<void> {
    const professional = await this.findOne(coren);
    await this.professionalRepository.remove(professional);
  }

  async verifyPassword(coren: string, password: string): Promise<boolean> {
    const professional = await this.findByCorenWithPassword(coren);
    return await argon2.verify(professional.password, password);
  }
}
