import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateProfessionalDto } from './create-professional.dto';

export class UpdateProfessionalDto extends PartialType(OmitType(CreateProfessionalDto, ['coren'] as const)) {}
