import { Controller, Get, Param } from '@nestjs/common';
import { ProgramasService } from './programas.service';

@Controller('programas')
export class ProgramasController {
    constructor(private readonly programasService: ProgramasService){}
    @Get(':value')
    findByValue(@Param('value') value:string){
        return this.programasService.findByValueProperty(value)
    }
    @Get()
    findAllValues(){
        return this.programasService.findAllValues()
    }
}
