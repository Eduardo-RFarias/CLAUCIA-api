import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import { InstitutionService } from '../institution/institution.service';
import { UploadService } from '../../shared/services/upload/upload.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly institutionService: InstitutionService,
    private readonly uploadService: UploadService,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    // Validate institution exists (required)
    try {
      await this.institutionService.findOne(createPatientDto.institution_name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Institution "${createPatientDto.institution_name}" not found`);
      }
      throw error;
    }

    if (createPatientDto.photo) {
      const photoUrl = await this.uploadService.uploadFile(createPatientDto.photo);
      createPatientDto.photo = photoUrl;
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
      where: { institution_name: institutionName },
    });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.findOne(id);

    // Validate institution exists if being updated
    if (updatePatientDto.institution_name !== undefined) {
      try {
        await this.institutionService.findOne(updatePatientDto.institution_name);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new BadRequestException(`Institution "${updatePatientDto.institution_name}" not found`);
        }
        throw error;
      }
    }

    // Handle photo upload if provided
    if (updatePatientDto.photo) {
      // Delete old photo if exists
      if (patient.photo) {
        await this.uploadService.deleteFile(patient.photo);
      }

      const photoUrl = await this.uploadService.uploadFile(updatePatientDto.photo);
      updatePatientDto.photo = photoUrl;
    }

    Object.assign(patient, updatePatientDto);
    return await this.patientRepository.save(patient);
  }

  async remove(id: number): Promise<void> {
    const patient = await this.findOne(id);

    // Delete associated photo file if exists
    if (patient.photo) {
      await this.uploadService.deleteFile(patient.photo);
    }

    await this.patientRepository.remove(patient);
  }
}
