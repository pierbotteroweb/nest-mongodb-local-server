import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArquivosService } from './arquivos.service';

@Controller('arquivos')
export class ArquivosController {
    constructor(private readonly arquivosService: ArquivosService){}

    @Get('getArquivo')
    getArquivo(
        @Query('programaDeTv') programaDeTv:string){
        return this.arquivosService.getArquivoFromProgramaDeTvValue(programaDeTv)
    }


    @Get('resetAdded')
    resetAdded(
        @Query('programaDeTv') programaDeTv:string){
        return this.arquivosService.resetAddedonArquivosOfProgramaDeTv(programaDeTv)
    }

    @Get('getArquivosForProgramaMontado')
    getArquivosToAsembleProgramaMontado(
        @Query('programaDeTv') programaDeTv:string){
        return this.arquivosService.getArquivosToAsembleProgramaMontado(programaDeTv)
    }

    @Get('getListaDeArquivos')
    getListaDeArquivosPorCategoria(
        @Query('categoria') categoria:string){
        return this.arquivosService.getArquivosPorCaterogia(categoria)
    }

}
