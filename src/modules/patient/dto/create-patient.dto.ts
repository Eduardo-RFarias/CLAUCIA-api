import { IsString, IsNotEmpty, MaxLength, IsDateString, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({
    description: 'The name of the patient',
    example: 'João Silva',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'The date of birth of the patient',
    example: '1990-01-15',
  })
  @IsDateString()
  @IsNotEmpty()
  date_of_birth: Date;

  @ApiProperty({
    description: 'The sex of the patient',
    example: 'M',
    enum: ['M', 'F'],
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['M', 'F'])
  sex: string;

  @ApiProperty({
    description: 'The photo of the patient',
    example: 'patient-photo.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  photo?: string;
}
