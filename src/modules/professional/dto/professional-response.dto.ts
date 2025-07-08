import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProfessionalResponseDto {
  @ApiProperty({
    description: 'COREN registration number of the professional',
    example: 'COREN-SP-123456',
  })
  @Expose()
  coren: string;

  @ApiProperty({
    description: 'Full name of the professional',
    example: 'Dr. Maria Silva Santos',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'URL or path to the professional photo',
    example: 'https://example.com/photos/maria-silva.jpg',
    nullable: true,
  })
  @Expose()
  photo: string;

  @ApiProperty({
    description: 'The creation timestamp of the professional record',
    example: '2024-07-08T12:34:56.000Z',
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    description: 'The last update timestamp of the professional record',
    example: '2024-07-08T12:34:56.000Z',
  })
  @Expose()
  updated_at: Date;
}
