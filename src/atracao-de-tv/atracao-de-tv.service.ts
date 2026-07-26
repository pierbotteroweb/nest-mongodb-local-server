import { Injectable } from '@nestjs/common';
import { CreateAtracaoDeTvDto } from './dto/create-atracao-de-tv.dto';
import { UpdateAtracaoDeTvDto } from './dto/update-atracao-de-tv.dto';

@Injectable()
export class AtracaoDeTvService {
  create(createAtracaoDeTvDto: CreateAtracaoDeTvDto) {
    return 'This action adds a new atracaoDeTv';
  }

  findAll() {
    return `This action returns all atracaoDeTv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} atracaoDeTv`;
  }

  update(id: number, updateAtracaoDeTvDto: UpdateAtracaoDeTvDto) {
    return `This action updates a #${id} atracaoDeTv`;
  }

  remove(id: number) {
    return `This action removes a #${id} atracaoDeTv`;
  }
}
