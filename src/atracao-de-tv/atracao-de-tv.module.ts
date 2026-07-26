import { Module } from '@nestjs/common';
import { AtracaoDeTvService } from './atracao-de-tv.service';
import { AtracaoDeTvController } from './atracao-de-tv.controller';

@Module({
  controllers: [AtracaoDeTvController],
  providers: [AtracaoDeTvService],
})
export class AtracaoDeTvModule {}
