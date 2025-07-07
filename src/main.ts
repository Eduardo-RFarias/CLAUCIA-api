import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';
import { AppConfigService } from './config/app-config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new ConsoleLogger({ json: true }) });

  const appConfigService = app.get(AppConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(compression());
  app.use(helmet());
  app.enableCors();

  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Claucia API')
        .setDescription('Claucia API serves the Claucia mobile app.')
        .setVersion('0.0.1')
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .build(),
    ),
  );

  await app.listen(appConfigService.port);
}

void bootstrap();
