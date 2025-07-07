import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class InstitutionResponseDto {
  @ApiProperty({
    description: 'The name of the institution',
    example: 'Hospital São Paulo',
  })
  @Expose()
  name: string;
}
