import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InstitutionLoginDto {
  @ApiProperty({
    description: 'Name of the institution',
    example: 'Hospital São Paulo',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Password for the institution account',
    example: 'SecurePassword123!',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}
