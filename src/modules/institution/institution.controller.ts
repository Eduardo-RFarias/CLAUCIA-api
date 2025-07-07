import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto, UpdateInstitutionDto, InstitutionResponseDto } from './dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Institutions')
@Controller('institutions')
@UseInterceptors(ClassSerializerInterceptor)
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new institution' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Institution created successfully',
    type: InstitutionResponseDto,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Institution with this name already exists' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  async create(@Body() createInstitutionDto: CreateInstitutionDto): Promise<InstitutionResponseDto> {
    const institution = await this.institutionService.create(createInstitutionDto);
    return plainToInstance(InstitutionResponseDto, institution);
  }

  @Get()
  @ApiOperation({ summary: 'Get all institutions' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of all institutions', type: [InstitutionResponseDto] })
  async findAll(): Promise<InstitutionResponseDto[]> {
    const institutions = await this.institutionService.findAll();
    return institutions.map((institution) => plainToInstance(InstitutionResponseDto, institution));
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get an institution by name' })
  @ApiParam({ name: 'name', description: 'Institution name', example: 'Hospital São Paulo' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Institution found', type: InstitutionResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Institution not found' })
  async findOne(@Param('name') name: string): Promise<InstitutionResponseDto> {
    const institution = await this.institutionService.findOne(name);
    return plainToInstance(InstitutionResponseDto, institution);
  }

  @Patch(':name')
  @ApiOperation({ summary: 'Update an institution' })
  @ApiParam({ name: 'name', description: 'Institution name', example: 'Hospital São Paulo' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Institution updated successfully', type: InstitutionResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Institution not found' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Institution with new name already exists' })
  async update(
    @Param('name') name: string,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ): Promise<InstitutionResponseDto> {
    const institution = await this.institutionService.update(name, updateInstitutionDto);
    return plainToInstance(InstitutionResponseDto, institution);
  }

  @Delete(':name')
  @ApiOperation({ summary: 'Delete an institution' })
  @ApiParam({ name: 'name', description: 'Institution name', example: 'Hospital São Paulo' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Institution deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Institution not found' })
  async remove(@Param('name') name: string): Promise<{ message: string }> {
    await this.institutionService.remove(name);
    return { message: `Institution "${name}" has been successfully deleted` };
  }
}
