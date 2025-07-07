import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import { InstitutionService } from '../institution/institution.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly institutionService: InstitutionService,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    // Validate institution exists (required)
    try {
      await this.institutionService.findOne(createPatientDto.institutionName);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Institution "${createPatientDto.institutionName}" not found`);
      }
      throw error;
    }

    const patient = this.patientRepository.create(createPatientDto);
    return await this.patientRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientRepository.find();
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID "${id}" not found`);
    }

    return patient;
  }

  async findByInstitution(institutionName: string): Promise<Patient[]> {
    return await this.patientRepository.find({
      where: { institutionName },
    });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.findOne(id);

    // Validate institution exists if being updated
    if (updatePatientDto.institutionName !== undefined) {
      try {
        await this.institutionService.findOne(updatePatientDto.institutionName);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new BadRequestException(`Institution "${updatePatientDto.institutionName}" not found`);
        }
        throw error;
      }
    }

    Object.assign(patient, updatePatientDto);
    return await this.patientRepository.save(patient);
  }

  async remove(id: number): Promise<void> {
    const patient = await this.findOne(id);
    await this.patientRepository.remove(patient);
  }
}
