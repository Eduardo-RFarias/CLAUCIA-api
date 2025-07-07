import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SampleService } from './sample.service';
import { CreateSampleDto, UpdateSampleDto, SampleResponseDto } from './dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Samples')
@Controller('samples')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sample' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Sample created successfully',
    type: SampleResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  async create(@Body() createSampleDto: CreateSampleDto): Promise<SampleResponseDto> {
    const sample = await this.sampleService.create(createSampleDto);
    return plainToInstance(SampleResponseDto, sample, { excludeExtraneousValues: true });
  }

  @Get()
  @ApiOperation({ summary: 'Get all samples' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of all samples', type: [SampleResponseDto] })
  async findAll(): Promise<SampleResponseDto[]> {
    const samples = await this.sampleService.findAll();
    return samples.map((sample) => plainToInstance(SampleResponseDto, sample, { excludeExtraneousValues: true }));
  }

  @Get('wound/:woundId')
  @ApiOperation({ summary: 'Get all samples for a specific wound' })
  @ApiParam({ name: 'woundId', description: 'Wound ID', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of samples for the wound', type: [SampleResponseDto] })
  async findByWound(@Param('woundId', ParseIntPipe) woundId: number): Promise<SampleResponseDto[]> {
    const samples = await this.sampleService.findByWound(woundId);
    return samples.map((sample) => plainToInstance(SampleResponseDto, sample, { excludeExtraneousValues: true }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sample by ID' })
  @ApiParam({ name: 'id', description: 'Sample ID', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Sample found', type: SampleResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Sample not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SampleResponseDto> {
    const sample = await this.sampleService.findOne(id);
    return plainToInstance(SampleResponseDto, sample, { excludeExtraneousValues: true });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sample' })
  @ApiParam({ name: 'id', description: 'Sample ID', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Sample updated successfully', type: SampleResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Sample not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSampleDto: UpdateSampleDto,
  ): Promise<SampleResponseDto> {
    const sample = await this.sampleService.update(id, updateSampleDto);
    return plainToInstance(SampleResponseDto, sample, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sample' })
  @ApiParam({ name: 'id', description: 'Sample ID', example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Sample deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Sample not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.sampleService.remove(id);
    return { message: `Sample with ID "${id}" has been successfully deleted` };
  }
}
