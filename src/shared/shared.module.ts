import { Module } from '@nestjs/common';
import { UploadService } from './services/upload/upload.service';

@Module({
  providers: [UploadService],
  exports: [UploadService],
})
export class SharedModule {}
