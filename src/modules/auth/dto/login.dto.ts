import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
}
