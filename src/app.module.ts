import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/app-config.service';

@Module({
  imports: [
    AppConfigModule,
    ThrottlerModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        throttlers: [
          {
            ttl: configService.throttleTtl,
            limit: configService.throttleLimit,
          },
        ],
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        type: 'mysql',
        host: configService.mysqlHost,
        port: configService.mysqlPort,
        username: configService.mysqlUsername,
        password: configService.mysqlPassword,
        database: configService.mysqlDatabase,
        entities: [],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
  ],
})
export class AppModule {}
