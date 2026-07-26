import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtracaoDeTvService } from './atracao-de-tv.service';
import { CreateAtracaoDeTvDto } from './dto/create-atracao-de-tv.dto';
import { UpdateAtracaoDeTvDto } from './dto/update-atracao-de-tv.dto';

@Controller('atracao-de-tv')
export class AtracaoDeTvController {
  constructor(private readonly atracaoDeTvService: AtracaoDeTvService) {}

  @Post()
  create(@Body() createAtracaoDeTvDto: CreateAtracaoDeTvDto) {
    return this.atracaoDeTvService.create(createAtracaoDeTvDto);
  }

  @Get()
  findAll() {
    return this.atracaoDeTvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atracaoDeTvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtracaoDeTvDto: UpdateAtracaoDeTvDto) {
    return this.atracaoDeTvService.update(+id, updateAtracaoDeTvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atracaoDeTvService.remove(+id);
  }
}
