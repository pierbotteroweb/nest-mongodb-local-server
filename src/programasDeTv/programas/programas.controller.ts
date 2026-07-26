import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProgramasService } from './programas.service';
import { AddProgramaMontadoDto } from './dto/add-programa-montado.dto';
import { AtualizaHorarioProgramaMontadoDto } from './dto/atualiza-horario-programa-montado.dto';
import { DeletaProgramaMontadoDto } from './dto/deleta-programa-montado.dto';
import { AtualizaGradeOrderProgramaMontadoDto } from './dto/atualiza-grade-order-programa-montado.dto';

@Controller('programas')
export class ProgramasController {
    constructor(private readonly programasService: ProgramasService){}
    @Get('getProgramasMontados')
    getProgramasMontados(
        @Query('canal') canal:string,
        @Query('diaDaSemana') diaDaSemana:string){
        return this.programasService.getProgramasMontadosByCanalAndDiaDaSemanma(canal,diaDaSemana)
    }
    @Get('getAllProgramasMontados')
    getAllProgramasMontados(){
        return this.programasService.getAllProgramasMontados()
    }
    @Get()
    findAllValues(){
        return this.programasService.findAllValues()
    }
    @Get(':value')
    findByValue(@Param('value') value:string){
        return this.programasService.findByValueProperty(value)
    }
    
    @Post('addProgramaMontado')
    addProgramaMontado(@Body() body:AddProgramaMontadoDto){
        return this.programasService.addProgramaMontado(body)
    }
    
    @Post('atualizaHorarioDeProgramasMontados')
    atualizaHorarioDeProgramasMontados(@Body() body:AtualizaHorarioProgramaMontadoDto[]){
        return this.programasService.atualizaHorarioDeProgramasMontados(body)
    }
    
    @Post('atualizaGradeOrderDeProgramasMontados')
    atualizaGradeOrderDeProgramasMontados(@Body() body:AtualizaGradeOrderProgramaMontadoDto[]){
        return this.programasService.atualizaGradeOrderDeProgramasMontados(body)
    }
    
    @Post('deletaProgramasMontados')
    deletaProgramasMontados(@Body() body:string[]){
        return this.programasService.deletaProgramasMontados(body)
    }
    
    @Post('deleteProgramaMontado')
    deleteProgramaMontado(@Body() body:DeletaProgramaMontadoDto){
        return this.programasService.deleteProgramaMontado(body.idProgMontado)
    }
}
