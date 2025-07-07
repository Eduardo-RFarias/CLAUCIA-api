import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get nodeEnv(): Environment {
    return this.configService.get('NODE_ENV')!;
  }

  get port(): number {
    return this.configService.get('PORT')!;
  }

  get mysqlHost(): string {
    return this.configService.get('MYSQL_HOST')!;
  }

  get mysqlPort(): number {
    return this.configService.get('MYSQL_PORT')!;
  }

  get mysqlUsername(): string {
    return this.configService.get('MYSQL_USERNAME')!;
  }

  get mysqlPassword(): string {
    return this.configService.get('MYSQL_PASSWORD')!;
  }

  get mysqlDatabase(): string {
    return this.configService.get('MYSQL_DATABASE')!;
  }

  get throttleTtl(): number {
    return this.configService.get('THROTTLE_TTL')!;
  }

  get throttleLimit(): number {
    return this.configService.get('THROTTLE_LIMIT')!;
  }

  get isProduction(): boolean {
    return this.nodeEnv === Environment.Production;
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === Environment.Development;
  }
}
