import { Module } from '@nestjs/common';
import { ArquivosController } from './arquivos.controller';
import { ArquivosService } from './arquivos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Programa, ProgramaSchema } from 'src/schemas/programa.schema';
import { ArquivoSchema } from 'src/schemas/arquivo.schema';

@Module({
  controllers: [ArquivosController],
  imports:[
    MongooseModule.forFeature([
          { name: Programa.name, schema: ProgramaSchema },
          { name: 'Dublado', schema: ArquivoSchema, collection: 'dublado' },
          { name: 'Intervalos', schema: ArquivoSchema, collection: 'intervalos' },
          { name: 'Madrugada', schema: ArquivoSchema, collection: 'madrugada' },
          { name: 'Movies', schema: ArquivoSchema, collection: 'movies' },
          { name: 'Noite', schema: ArquivoSchema, collection: 'noite' },
          { name: 'Novelas', schema: ArquivoSchema, collection: 'novelas' },
          { name: 'Originais', schema: ArquivoSchema, collection: 'originais' }
    ])
  ],
  providers:[ArquivosService]
})
export class ArquivosModule {}
