import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { InstitutionResponseDto } from '../../institution/dto/institution-response.dto';

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
    description: 'List of institutions where the professional works',
    type: [InstitutionResponseDto],
  })
  @Expose()
  @Type(() => InstitutionResponseDto)
  institutions: InstitutionResponseDto[];
}
