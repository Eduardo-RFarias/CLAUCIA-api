import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUrl } from 'class-validator';
import { IsOptional } from 'class-validator';

export class PatientResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the patient',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'The name of the patient',
    example: 'João Silva',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'The date of birth of the patient',
    example: '1990-01-15',
  })
  @Expose()
  date_of_birth: Date;

  @ApiProperty({
    description: 'The sex of the patient',
    example: 'M',
  })
  @Expose()
  sex: string;

  @ApiProperty({
    description: 'The photo of the patient (url)',
    example: 'https://example.com/patient-photo.jpg',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUrl()
  photo?: string;

  @ApiProperty({
    description: 'The name of the institution where the patient is treated',
    example: 'Hospital São Paulo',
  })
  @Expose()
  institution_name: string;

  @ApiProperty({
    description: 'The medical conditions of the patient',
    example: 'Diabetes, Hypertension',
    required: false,
  })
  @Expose()
  medical_conditions?: string;

  @ApiProperty({
    description: 'The creation timestamp of the patient record',
    example: '2024-07-08T12:34:56.000Z',
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    description: 'The last update timestamp of the patient record',
    example: '2024-07-08T12:34:56.000Z',
  })
  @Expose()
  updated_at: Date;
}
