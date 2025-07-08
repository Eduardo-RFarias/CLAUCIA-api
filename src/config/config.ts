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

  @IsString()
  JWT_SECRET: string =
    'F6!Sre09GYlpV4-!GoygJUPum6FYf5UkH=xZ7iWZ5A4/!YHPQ!TsTD0VT/8QNjiJ8lhrQYC?mvnN-9qXj0QAHHfijNZLZLcYBJ?SWFhzL7Ds5kk2!?O?M8qiWz6sR3?cWM=S0Zi6YQZ?yNVWyLs9s/G7ht1?Ttg7S?!-Ue-Qj81KU4!!VUHHXdciod11kRxrR79k24PaT7xYiWeQt5aH57Fn8NPfqglompZhY!3ggfFBC!B-cDQTnz/QeTecQiqs';

  @IsString()
  JWT_EXPIRES_IN: string = '1h';

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
