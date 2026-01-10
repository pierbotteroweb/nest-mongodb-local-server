import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Programa } from 'src/schemas/programa.schema';

@Injectable()
export class ProgramasService {
    
    constructor(
        @InjectModel(Programa.name)
        private programaModel: Model<Programa>
    ){}

    async findByValueProperty(value:string): Promise<Programa>{
        
        const programa = await this.programaModel.findOne({value}).exec()
        if(!programa) {
            throw new NotFoundException(                
                `Programa com value "${value}" não encontrado`,
            )
        }

        return programa
    }
}
