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
    description: 'The ID of the patient this wound belongs to',
    example: 1,
  })
  @Expose()
  patientId: number;
}
