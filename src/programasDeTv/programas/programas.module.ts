import { Module } from '@nestjs/common';
import { ProgramasController } from './programas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Programa, ProgramaSchema } from 'src/schemas/programa.schema';
import { ProgramasService } from './programas.service';

@Module({
  controllers: [ProgramasController],
  imports:[
    MongooseModule.forFeature([
      { name: Programa.name, schema: ProgramaSchema },
    ]),],
  providers:[ProgramasService]
})
export class ProgramasModule {}
