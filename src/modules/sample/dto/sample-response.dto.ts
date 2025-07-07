import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SampleResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the sample',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'The photo of the sample',
    example: 'sample-photo.jpg',
    required: false,
  })
  @Expose()
  photo?: string;

  @ApiProperty({
    description: 'AI classification result',
    example: 1,
    required: false,
  })
  @Expose()
  ai_classification?: number;

  @ApiProperty({
    description: 'Professional classification result',
    example: 2,
    required: false,
  })
  @Expose()
  professional_classification?: number;

  @ApiProperty({
    description: 'Height of the sample',
    example: 5.5,
    required: false,
  })
  @Expose()
  height?: number;

  @ApiProperty({
    description: 'Width of the sample',
    example: 3.2,
    required: false,
  })
  @Expose()
  width?: number;

  @ApiProperty({
    description: 'Date of the sample',
    example: '2024-01-15T10:30:00.000Z',
  })
  @Expose()
  date: Date;

  @ApiProperty({
    description: 'The ID of the wound this sample belongs to',
    example: 1,
  })
  @Expose()
  woundId: number;

  @ApiProperty({
    description: 'The COREN of the professional who created this sample',
    example: 'COREN123456',
    required: false,
  })
  @Expose()
  professionalCoren: string | null;
}
