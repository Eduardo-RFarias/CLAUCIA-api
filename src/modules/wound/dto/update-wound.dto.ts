import { PartialType } from '@nestjs/swagger';
import { CreateWoundDto } from './create-wound.dto';

export class UpdateWoundDto extends PartialType(CreateWoundDto) {}
