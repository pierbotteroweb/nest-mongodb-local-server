import { Module } from '@nestjs/common';
import { ProgramasController } from './programas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Programa, ProgramaSchema } from 'src/schemas/programa.schema';
import { ProgramasService } from './programas.service';
import { ProgramaMontado, ProgramaMontadoSchema } from 'src/schemas/programaMontado.schema';
import { ArquivoSchema } from 'src/schemas/arquivo.schema';

@Module({
  controllers: [ProgramasController],
  imports:[
    MongooseModule.forFeature([
      { name: Programa.name, schema: ProgramaSchema },
      { name: ProgramaMontado.name, schema: ProgramaMontadoSchema },
      { name: 'Dublado', schema: ArquivoSchema, collection: 'dublado' },
      { name: 'Intervalos', schema: ArquivoSchema, collection: 'intervalos' },
      { name: 'Madrugada', schema: ArquivoSchema, collection: 'madrugada' },
      { name: 'Movies', schema: ArquivoSchema, collection: 'movies' },
      { name: 'Noite', schema: ArquivoSchema, collection: 'noite' },
      { name: 'Novelas', schema: ArquivoSchema, collection: 'novelas' },
      { name: 'Originais', schema: ArquivoSchema, collection: 'originais' },
    ]),],
  providers:[ProgramasService]
})
export class ProgramasModule {}
