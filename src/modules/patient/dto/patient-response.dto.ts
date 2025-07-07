import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
    description: 'The photo of the patient',
    example: 'patient-photo.jpg',
    required: false,
  })
  @Expose()
  photo?: string;
}
