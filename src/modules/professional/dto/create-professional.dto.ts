import { IsString, IsNotEmpty, MaxLength, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfessionalDto {
  @ApiProperty({
    description: 'COREN registration number of the professional',
    example: 'COREN-SP-123456',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  coren: string;

  @ApiProperty({
    description: 'Password for the professional account',
    example: 'SecurePassword123!',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  password: string;

  @ApiProperty({
    description: 'Full name of the professional',
    example: 'Dr. Maria Silva Santos',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'URL or path to the professional photo',
    example: 'https://example.com/photos/maria-silva.jpg',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  photo?: string;

  @ApiPropertyOptional({
    description: 'List of institution names where the professional works',
    example: ['Hospital São Paulo', 'Clínica Central'],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  institutionNames?: string[];
}
