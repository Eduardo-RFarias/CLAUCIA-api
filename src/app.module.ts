import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/app-config.service';
import { InstitutionModule } from './modules/institution/institution.module';
import { ProfessionalModule } from './modules/professional/professional.module';
import { PatientModule } from './modules/patient/patient.module';
import { WoundModule } from './modules/wound/wound.module';
import { SampleModule } from './modules/sample/sample.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { Institution } from './modules/institution/entities/institution.entity';
import { Professional } from './modules/professional/entities/professional.entity';
import { Patient } from './modules/patient/entities/patient.entity';
import { Wound } from './modules/wound/entities/wound.entity';
import { Sample } from './modules/sample/entities/sample.entity';
import { SharedModule } from './shared/shared.module';

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
        entities: [Institution, Professional, Patient, Wound, Sample],
        migrations: ['dist/migrations/*.js'],
        synchronize: false,
        migrationsRun: true,
        timezone: 'Z',
      }),
    }),
    InstitutionModule,
    ProfessionalModule,
    PatientModule,
    WoundModule,
    SampleModule,
    AuthModule,
    HealthModule,
    SharedModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
