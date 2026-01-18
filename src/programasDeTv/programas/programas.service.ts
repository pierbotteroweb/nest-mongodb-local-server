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

    async findAllValues(): Promise<any[]> {
        const result = await this.programaModel
        .find({}, { value: 1,titulo: 1, _id: 0 })
        .lean()
        .exec();

        return result.map(({value,titulo}) =>({
                value,
                titulo
            }));
    }

}