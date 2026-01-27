import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProgramasService } from './programas.service';

@Controller('programas')
export class ProgramasController {
    constructor(private readonly programasService: ProgramasService){}
    @Get('getProgramasMontados')
    getProgramasMontados(
        @Query('canal') canal:string,
        @Query('diaDaSemana') diaDaSemana:string){
        return this.programasService.getProgramasMontadosByCanalAndDiaDaSemanma(canal,diaDaSemana)
    }
    @Get()
    findAllValues(){
        return this.programasService.findAllValues()
    }
    @Get(':value')
    findByValue(@Param('value') value:string){
        return this.programasService.findByValueProperty(value)
    }
}
