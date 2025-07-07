import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Max, Min, validateSync } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number = 3000;

  @IsString()
  MYSQL_HOST: string = 'localhost';

  @IsNumber()
  @Min(0)
  @Max(65535)
  MYSQL_PORT: number = 3306;

  @IsString()
  MYSQL_USERNAME: string = 'claucia';

  @IsString()
  MYSQL_PASSWORD: string = 'claucia';

  @IsString()
  MYSQL_DATABASE: string = 'claucia';

  @IsNumber()
  THROTTLE_TTL: number = 60;

  @IsNumber()
  THROTTLE_LIMIT: number = 10;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
