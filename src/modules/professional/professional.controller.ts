import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto, UpdateProfessionalDto, ProfessionalResponseDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Professionals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('professionals')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new professional' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Professional created successfully',
    type: ProfessionalResponseDto,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Professional with this COREN already exists' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'One or more institutions not found' })
  async create(@Body() createProfessionalDto: CreateProfessionalDto): Promise<ProfessionalResponseDto> {
    const professional = await this.professionalService.create(createProfessionalDto);
    return plainToInstance(ProfessionalResponseDto, professional, { excludeExtraneousValues: true });
  }

  @Get()
  @ApiOperation({ summary: 'Get all professionals' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of all professionals', type: [ProfessionalResponseDto] })
  async findAll(): Promise<ProfessionalResponseDto[]> {
    const professionals = await this.professionalService.findAll();
    return professionals.map((professional) =>
      plainToInstance(ProfessionalResponseDto, professional, { excludeExtraneousValues: true }),
    );
  }

  @Get(':coren')
  @ApiOperation({ summary: 'Get a professional by COREN' })
  @ApiParam({ name: 'coren', description: 'COREN registration number', example: 'COREN-SP-123456' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Professional found', type: ProfessionalResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Professional not found' })
  async findOne(@Param('coren') coren: string): Promise<ProfessionalResponseDto> {
    const professional = await this.professionalService.findOne(coren);
    return plainToInstance(ProfessionalResponseDto, professional, { excludeExtraneousValues: true });
  }

  @Patch(':coren')
  @ApiOperation({ summary: 'Update a professional' })
  @ApiParam({ name: 'coren', description: 'COREN registration number', example: 'COREN-SP-123456' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Professional updated successfully',
    type: ProfessionalResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Professional or institution not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  async update(
    @Param('coren') coren: string,
    @Body() updateProfessionalDto: UpdateProfessionalDto,
  ): Promise<ProfessionalResponseDto> {
    const professional = await this.professionalService.update(coren, updateProfessionalDto);
    return plainToInstance(ProfessionalResponseDto, professional, { excludeExtraneousValues: true });
  }

  @Delete(':coren')
  @ApiOperation({ summary: 'Delete a professional' })
  @ApiParam({ name: 'coren', description: 'COREN registration number', example: 'COREN-SP-123456' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Professional deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Professional not found' })
  async remove(@Param('coren') coren: string): Promise<{ message: string }> {
    await this.professionalService.remove(coren);
    return { message: `Professional with COREN "${coren}" has been successfully deleted` };
  }
}
