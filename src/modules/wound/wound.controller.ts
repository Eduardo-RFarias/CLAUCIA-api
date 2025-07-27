import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { WoundService } from './wound.service';
import { CreateWoundDto, UpdateWoundDto, WoundResponseDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Wounds')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles('professional')
@Controller('wounds')
export class WoundController {
  constructor(private readonly woundService: WoundService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wound' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Wound created successfully',
    type: WoundResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  async create(@Body() createWoundDto: CreateWoundDto): Promise<WoundResponseDto> {
    const wound = await this.woundService.create(createWoundDto);
    return plainToInstance(WoundResponseDto, wound, { excludeExtraneousValues: true });
  }

  @Get()
  @ApiOperation({ summary: 'Get all wounds' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of all wounds', type: [WoundResponseDto] })
  async findAll(): Promise<WoundResponseDto[]> {
    const wounds = await this.woundService.findAll();
    return wounds.map((wound) => plainToInstance(WoundResponseDto, wound, { excludeExtraneousValues: true }));
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get all wounds for a specific patient' })
  @ApiParam({ name: 'patientId', description: 'Patient ID', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of wounds for the patient', type: [WoundResponseDto] })
  async findByPatient(@Param('patientId', ParseIntPipe) patientId: number): Promise<WoundResponseDto[]> {
    const wounds = await this.woundService.findByPatient(patientId);
    return wounds.map((wound) => plainToInstance(WoundResponseDto, wound, { excludeExtraneousValues: true }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a wound by ID' })
  @ApiParam({ name: 'id', description: 'Wound ID', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Wound found', type: WoundResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Wound not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<WoundResponseDto> {
    const wound = await this.woundService.findOne(id);
    return plainToInstance(WoundResponseDto, wound, { excludeExtraneousValues: true });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a wound' })
  @ApiParam({ name: 'id', description: 'Wound ID', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Wound updated successfully', type: WoundResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Wound not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWoundDto: UpdateWoundDto,
  ): Promise<WoundResponseDto> {
    const wound = await this.woundService.update(id, updateWoundDto);
    return plainToInstance(WoundResponseDto, wound, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a wound' })
  @ApiParam({ name: 'id', description: 'Wound ID', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Wound deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Wound not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.woundService.remove(id);
    return { message: `Wound with ID "${id}" has been successfully deleted` };
  }
}
