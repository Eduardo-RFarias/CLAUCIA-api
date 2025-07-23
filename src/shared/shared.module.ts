import { Module } from '@nestjs/common';
import { UploadService } from './services/upload/upload.service';
import { FilesController } from './files/files.controller';

@Module({
  providers: [UploadService],
  exports: [UploadService],
  controllers: [FilesController],
})
export class SharedModule {}
