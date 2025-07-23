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
    description: 'The photo of the patient (data:image/{format};base64)',
    example:
      'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEXMzMz////T3Ph/AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==',
    required: false,
  })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({
    description: 'The name of the institution where the patient is treated',
    example: 'Hospital São Paulo',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  institution_name: string;

  @ApiProperty({
    description: 'The medical conditions of the patient',
    example: 'Diabetes, Hypertension',
    required: false,
    maxLength: 1024,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  medical_conditions?: string;
}
