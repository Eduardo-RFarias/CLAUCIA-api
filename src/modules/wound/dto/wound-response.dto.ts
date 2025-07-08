import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class WoundResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the wound',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'The location of the wound',
    example: 'Left arm',
  })
  @Expose()
  location: string;

  @ApiProperty({
    description: 'The origin of the wound',
    example: 'Surgical',
  })
  @Expose()
  origin: string;

  @ApiProperty({
    description: 'Description of the wound',
    example: 'Chronic ulcer on left leg',
    required: false,
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'The creation timestamp of the wound record',
    example: '2024-07-08T12:34:56.000Z',
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    description: 'The last update timestamp of the wound record',
    example: '2024-07-08T12:34:56.000Z',
  })
  @Expose()
  updated_at: Date;

  @ApiProperty({
    description: 'The ID of the patient this wound belongs to',
    example: 1,
  })
  @Expose()
  patientId: number;
}
