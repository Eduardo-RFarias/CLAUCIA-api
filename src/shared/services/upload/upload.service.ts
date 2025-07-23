import { Injectable, BadRequestException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join, resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly uploadPath = resolve(process.cwd(), 'uploads', 'images');
  private readonly allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  constructor() {
    this.ensureUploadDirectory();
  }

  async uploadFile(base64Data: string): Promise<string> {
    if (!base64Data || !base64Data.startsWith('data:image/')) {
      throw new BadRequestException('Invalid base64 image data');
    }

    try {
      // Extract mime type and base64 content
      const [header, base64Content] = base64Data.split(',');
      const mimeType = header.match(/data:([^;]+)/)?.[1];

      if (!mimeType || !this.allowedMimeTypes.includes(mimeType)) {
        throw new BadRequestException(`Unsupported image type. Allowed types: ${this.allowedMimeTypes.join(', ')}`);
      }

      // Get file extension from mime type
      const extension = mimeType.split('/')[1];
      const fileName = `${uuidv4()}.${extension}`;
      const filePath = join(this.uploadPath, fileName);

      // Convert base64 to buffer and save file
      const buffer = Buffer.from(base64Content, 'base64');
      await fs.writeFile(filePath, buffer);

      // Return the URL path to access the file
      return `/uploads/images/${fileName}`;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to process image upload');
    }
  }

  private async ensureUploadDirectory(): Promise<void> {
    try {
      await fs.access(this.uploadPath);
    } catch {
      await fs.mkdir(this.uploadPath, { recursive: true });
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = resolve(process.cwd(), filePath.replace(/^\//, ''));
      await fs.unlink(fullPath);
    } catch (error) {
      // File doesn't exist or can't be deleted - log but don't throw
      console.warn(`Failed to delete file: ${filePath}`, error);
    }
  }

  // Utility method to get upload statistics
  async getUploadStats(): Promise<{ totalFiles: number; totalSize: number }> {
    try {
      const files = await fs.readdir(this.uploadPath);
      let totalSize = 0;

      for (const file of files) {
        const stats = await fs.stat(join(this.uploadPath, file));
        totalSize += stats.size;
      }

      return { totalFiles: files.length, totalSize };
    } catch {
      return { totalFiles: 0, totalSize: 0 };
    }
  }
}
