import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Arquivo } from 'src/schemas/arquivo.schema';
import { Programa } from 'src/schemas/programa.schema';

@Injectable()
export class ArquivosService {

    private readonly arquivosPorTipo: Record<string, Model<Arquivo>>

    constructor(
            @InjectModel(Programa.name)
            private programaModel: Model<Programa>,

            @InjectModel('Dublado')
            private readonly dubladoModel: Model<Arquivo>,
    
            @InjectModel('Intervalos')
            private readonly intervalosModel: Model<Arquivo>,
    
            @InjectModel('Madrugada')
            private readonly madrugadaModel: Model<Arquivo>,
    
            @InjectModel('Movies')
            private readonly moviesModel: Model<Arquivo>,
    
            @InjectModel('Noite')
            private readonly noiteModel: Model<Arquivo>,
    
            @InjectModel('Novelas')
            private readonly novelasModel: Model<Arquivo>,
    
            @InjectModel('Originais')
            private readonly originaisModel: Model<Arquivo>){
                
                this.arquivosPorTipo = {
                    dublado: this.dubladoModel,
                    intervalos: this.intervalosModel,
                    madrugada: this.madrugadaModel,
                    movies: this.moviesModel,
                    noite: this.noiteModel,
                    novelas: this.novelasModel,
                    originais: this.originaisModel,
                }

    }

    async resetAddedonArquivosOfProgramaDeTv(programaDeTv:string){
        
        const programa = await this.programaModel.findOne({value:programaDeTv})
        .lean()
        .exec()

        if(!programa) {
            throw new NotFoundException(                
                `Programa com value "${programaDeTv}" não encontrado`,
            )
        }

        const { tipo } = programa;

        const arquivoModel = this.arquivosPorTipo[tipo];

        if (!arquivoModel) {
            throw new BadRequestException(`Tipo inválido: ${tipo}`);
        }
        
        const result = await arquivoModel.updateMany(
            { programaDeTv },
            { $set: { added: false } },
        );

        return result;


    }

    async getArquivoFromProgramaDeTvValue(programaDeTv:string){
        
        const programa = await this.programaModel.findOne({value:programaDeTv})
        .lean()
        .exec()

        if(!programa) {
            throw new NotFoundException(                
                `Programa com value "${programaDeTv}" não encontrado`,
            )
        }

        const { tipo } = programa;

        const arquivoModel = this.arquivosPorTipo[tipo];

        if (!arquivoModel) {
            throw new BadRequestException(`Tipo inválido: ${tipo}`);
        }

        let arquivoToReturn = await arquivoModel.findOneAndUpdate({
        programaDeTv,
        added: false,
        order: { $ne: null }
        },
        { $set: { added: true } },
        {
        sort: { order: 1 },
        new: true,
        }).lean().exec();

        if (!arquivoToReturn){

            await arquivoModel.updateMany(
            { programaDeTv },
            { $set: { added: false } });

            arquivoToReturn = await arquivoModel.findOneAndUpdate({
            programaDeTv,
            added: false,
            order: { $ne: null }
            },
            { $set: { added: true } },
            {
            sort: { order: 1 },
            new: true,
            }).lean().exec();

            return arquivoToReturn

        }

        return arquivoToReturn
    }

    async getArquivosToAsembleProgramaMontado(programasDeTv:string[]){
        let arquivos:any = []

        for (const programa of programasDeTv) {
            const arquivo:any = await this.getArquivoFromProgramaDeTvValue(programa)

            if(arquivo){
                arquivos.push(arquivo)
            }

        }

        return arquivos
    }

}
