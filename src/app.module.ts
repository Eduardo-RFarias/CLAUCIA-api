import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/app-config.service';
import { InstitutionModule } from './modules/institution/institution.module';
import { ProfessionalModule } from './modules/professional/professional.module';
import { Institution } from './modules/institution/entities/institution.entity';
import { Professional } from './modules/professional/entities/professional.entity';

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
        entities: [Institution, Professional],
        migrations: ['dist/migrations/*.js'],
        synchronize: false,
        migrationsRun: true,
      }),
    }),
    InstitutionModule,
    ProfessionalModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
