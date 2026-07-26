import { PartialType } from '@nestjs/mapped-types';
import { CreateAtracaoDeTvDto } from './create-atracao-de-tv.dto';

export class UpdateAtracaoDeTvDto extends PartialType(CreateAtracaoDeTvDto) {}
