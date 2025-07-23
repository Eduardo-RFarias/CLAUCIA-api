import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { join, resolve } from 'path';
import { promises as fs } from 'fs';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('files')
@Controller('uploads')
export class FilesController {
  private readonly uploadPath = resolve(process.cwd(), 'uploads', 'images');

  @Get('images/:filename')
  @ApiOperation({ summary: 'Serve uploaded images' })
  @ApiParam({ name: 'filename', description: 'The filename of the image to serve' })
  @ApiResponse({ status: 200, description: 'Image file served successfully' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    try {
      // Security: Only allow certain file extensions and prevent path traversal
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      const fileExtension = filename.toLowerCase().substring(filename.lastIndexOf('.'));

      if (!allowedExtensions.includes(fileExtension)) {
        throw new NotFoundException('File not found');
      }

      // Prevent path traversal attacks
      if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        throw new NotFoundException('File not found');
      }

      const filePath = join(this.uploadPath, filename);

      // Security: Ensure file is within upload directory
      if (!filePath.startsWith(this.uploadPath)) {
        throw new NotFoundException('File not found');
      }

      // Check if file exists
      try {
        await fs.access(filePath);
      } catch {
        throw new NotFoundException('File not found');
      }

      // Set appropriate content type
      const mimeTypes: { [key: string]: string } = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
      };

      res.setHeader('Content-Type', mimeTypes[fileExtension] || 'application/octet-stream');
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
      res.setHeader('ETag', `"${filename}"`);

      res.sendFile(filePath);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('File not found');
    }
  }
}
