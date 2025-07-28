import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { HealthResponseDto } from './dto/health-response.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Check application health' })
  @ApiResponse({
    status: 200,
    description: 'Application is healthy',
    type: HealthResponseDto,
  })
  @ApiResponse({
    status: 503,
    description: 'Application is unhealthy',
  })
  async getHealth(): Promise<HealthResponseDto> {
    return await this.healthService.checkHealth();
  }
}
