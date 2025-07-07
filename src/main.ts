import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppConfigService } from './config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new ConsoleLogger({ json: true }) });

  const appConfigService = app.get(AppConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(compression());
  app.use(helmet());
  app.enableCors();

  await app.listen(appConfigService.port);
}

void bootstrap();
