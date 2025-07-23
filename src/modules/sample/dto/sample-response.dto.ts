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
    description: 'The photo of the sample (url)',
    example: '/uploads/images/550e8400-e29b-41d4-a716-446655440000.jpg',
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
  wound_id: number;

  @ApiProperty({
    description: 'The COREN of the professional who created this sample',
    example: 'COREN123456',
    required: false,
  })
  @Expose()
  professional_coren: string | null;

  @ApiProperty({
    description: 'The creation timestamp of the sample record',
    example: '2024-07-08T12:34:56.000Z',
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    description: 'The last update timestamp of the sample record',
    example: '2024-07-08T12:34:56.000Z',
  })
  @Expose()
  updated_at: Date;
}
