import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { HealthResponseDto } from './dto/health-response.dto';
import os from 'os';

@Injectable()
export class HealthService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async checkHealth(): Promise<HealthResponseDto> {
    const startTime = Date.now();
    const checks = {
      database: await this.checkDatabase(),
      memory: this.checkMemory(),
      uptime: process.uptime(),
    };

    const isHealthy = Object.values(checks).every((check) =>
      typeof check === 'object' ? check.status === 'ok' : true,
    );

    const response: HealthResponseDto = {
      status: isHealthy ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: Date.now() - startTime,
      checks,
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '0.0.1',
    };

    if (!isHealthy) {
      throw new HttpException(response, HttpStatus.SERVICE_UNAVAILABLE);
    }

    return response;
  }

  private async checkDatabase(): Promise<{ status: string; responseTime: number; error?: string }> {
    const startTime = Date.now();

    try {
      // Execute a simple SELECT 1 query to test database connectivity
      await this.dataSource.query('SELECT 1');

      return {
        status: 'ok',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      return {
        status: 'error',
        responseTime: Date.now() - startTime,
        error: error.message || 'Database connection failed',
      };
    }
  }

  private checkMemory(): { status: string; used: number; free: number; total: number } {
    const memoryUsage = process.memoryUsage();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();

    // Consider memory unhealthy if RSS usage is above 80% of total system memory
    const memoryThreshold = totalMemory * 0.8;
    const isHealthy = memoryUsage.rss < memoryThreshold;

    return {
      status: isHealthy ? 'ok' : 'warning',
      used: Math.round(memoryUsage.rss / 1024 / 1024), // MB
      free: Math.round(freeMemory / 1024 / 1024), // MB
      total: Math.round(totalMemory / 1024 / 1024), // MB
    };
  }
}
