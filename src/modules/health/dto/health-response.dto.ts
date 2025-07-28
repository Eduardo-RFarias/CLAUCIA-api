import { ApiProperty } from '@nestjs/swagger';

class DatabaseCheckDto {
  @ApiProperty({ example: 'ok', description: 'Database status' })
  status: string;

  @ApiProperty({ example: 25, description: 'Database response time in milliseconds' })
  responseTime: number;

  @ApiProperty({
    example: 'Connection timeout',
    description: 'Error message if database check failed',
    required: false,
  })
  error?: string;
}

class MemoryCheckDto {
  @ApiProperty({ example: 'ok', description: 'Memory status' })
  status: string;

  @ApiProperty({ example: 128, description: 'Used memory in MB' })
  used: number;

  @ApiProperty({ example: 512, description: 'Free memory in MB' })
  free: number;

  @ApiProperty({ example: 1024, description: 'Total memory in MB' })
  total: number;
}

class HealthChecksDto {
  @ApiProperty({ type: DatabaseCheckDto, description: 'Database connectivity check' })
  database: DatabaseCheckDto;

  @ApiProperty({ type: MemoryCheckDto, description: 'Memory usage check' })
  memory: MemoryCheckDto;

  @ApiProperty({ example: 3600, description: 'Application uptime in seconds' })
  uptime: number;
}

export class HealthResponseDto {
  @ApiProperty({
    example: 'ok',
    description: 'Overall health status',
    enum: ['ok', 'error', 'warning'],
  })
  status: string;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'Health check timestamp',
  })
  timestamp: string;

  @ApiProperty({ example: 3600, description: 'Application uptime in seconds' })
  uptime: number;

  @ApiProperty({ example: 45, description: 'Health check response time in milliseconds' })
  responseTime: number;

  @ApiProperty({ type: HealthChecksDto, description: 'Detailed health checks' })
  checks: HealthChecksDto;

  @ApiProperty({ example: 'production', description: 'Application environment' })
  environment: string;

  @ApiProperty({ example: '1.0.0', description: 'Application version' })
  version: string;
}
