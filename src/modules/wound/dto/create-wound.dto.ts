import { IsString, IsNotEmpty, MaxLength, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWoundDto {
  @ApiProperty({
    description: 'The location of the wound',
    example: 'Left arm',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  location: string;

  @ApiProperty({
    description: 'The origin of the wound',
    example: 'Surgical',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  origin: string;

  @ApiProperty({
    description: 'The ID of the patient this wound belongs to',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  patientId: number;
}
