import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { validate } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
