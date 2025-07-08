import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class InstitutionResponseDto {
  @ApiProperty({
    description: 'The name of the institution',
    example: 'Hospital São Paulo',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'The creation timestamp of the institution record',
    example: '2024-07-08T12:34:56.000Z',
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    description: 'The last update timestamp of the institution record',
    example: '2024-07-08T12:34:56.000Z',
  })
  @Expose()
  updated_at: Date;
}
