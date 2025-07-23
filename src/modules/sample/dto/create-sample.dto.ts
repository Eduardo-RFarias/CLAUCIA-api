import { IsString, IsOptional, MaxLength, IsNumber, IsPositive, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSampleDto {
  @ApiProperty({
    description: 'The photo of the sample (data:image/{format};base64)',
    example:
      'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEXMzMz////T3Ph/AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==',
    required: false,
  })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({
    description: 'AI classification result',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  ai_classification?: number;

  @ApiProperty({
    description: 'Professional classification result',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  professional_classification?: number;

  @ApiProperty({
    description: 'Height of the sample',
    example: 5.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty({
    description: 'Width of the sample',
    example: 3.2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  width?: number;

  @ApiProperty({
    description: 'Date of the sample',
    example: '2024-01-15T10:30:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty({
    description: 'The ID of the wound this sample belongs to',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  wound_id: number;

  @ApiProperty({
    description: 'The COREN of the professional who created this sample',
    example: 'COREN123456',
    required: false,
  })
  @IsString()
  @MaxLength(255)
  professional_coren: string;
}
