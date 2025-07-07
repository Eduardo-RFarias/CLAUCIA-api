import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { CreatePatientDto, UpdatePatientDto, PatientResponseDto } from './dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Patient created successfully',
    type: PatientResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  async create(@Body() createPatientDto: CreatePatientDto): Promise<PatientResponseDto> {
    const patient = await this.patientService.create(createPatientDto);
    return plainToInstance(PatientResponseDto, patient, { excludeExtraneousValues: true });
  }

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of all patients', type: [PatientResponseDto] })
  async findAll(): Promise<PatientResponseDto[]> {
    const patients = await this.patientService.findAll();
    return patients.map((patient) => plainToInstance(PatientResponseDto, patient, { excludeExtraneousValues: true }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a patient by ID' })
  @ApiParam({ name: 'id', description: 'Patient ID', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Patient found', type: PatientResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Patient not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PatientResponseDto> {
    const patient = await this.patientService.findOne(id);
    return plainToInstance(PatientResponseDto, patient, { excludeExtraneousValues: true });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a patient' })
  @ApiParam({ name: 'id', description: 'Patient ID', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Patient updated successfully', type: PatientResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Patient not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<PatientResponseDto> {
    const patient = await this.patientService.update(id, updatePatientDto);
    return plainToInstance(PatientResponseDto, patient, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a patient' })
  @ApiParam({ name: 'id', description: 'Patient ID', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Patient deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Patient not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.patientService.remove(id);
    return { message: `Patient with ID "${id}" has been successfully deleted` };
  }
}
