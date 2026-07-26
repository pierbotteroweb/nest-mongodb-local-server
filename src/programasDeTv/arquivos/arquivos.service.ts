import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Arquivo } from 'src/schemas/arquivo.schema';
import { Programa } from 'src/schemas/programa.schema';

@Injectable()
export class ArquivosService {

    private readonly arquivosPorCategoria: Record<string, Model<Arquivo>>

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

            @InjectModel('Dvds')
            private readonly dvdsModel: Model<Arquivo>,
    
            @InjectModel('Originais')
            private readonly originaisModel: Model<Arquivo>){
                
                this.arquivosPorCategoria = {
                    dublado: this.dubladoModel,
                    intervalos: this.intervalosModel,
                    madrugada: this.madrugadaModel,
                    movies: this.moviesModel,
                    noite: this.noiteModel,
                    novelas: this.novelasModel,
                    originais: this.originaisModel,
                    dvds: this.dvdsModel,
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

        const arquivoModel = this.arquivosPorCategoria[tipo];

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
                `Programa com value "${programaDeTv}" não existe`,
            )
        }

        const { tipo } = programa;

        const arquivoModel = this.arquivosPorCategoria[tipo];

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

    async getArquivosEmLote(programasDeTv:string[]){
        let arquivos:any = []

        for (const programa of programasDeTv) {
            const arquivo:any = await this.getArquivoFromProgramaDeTvValue(programa)

            if(arquivo){
                arquivos.push(arquivo)
            }

        }

        return arquivos
    }

    async getArquivosToAsembleProgramaMontado(programaDeTv:string){
        
        const programa:any = await this.programaModel.findOne({value:programaDeTv})
        .lean()
        .exec()

        if(!programa) {
            throw new NotFoundException(                
                `Programa com value "${programaDeTv}" não encontrado`,
            )
        }

        const { value:principal } = programa;

        const arquivoPrincipal:any = await this.getArquivoFromProgramaDeTvValue(principal)

        const {cortesParaIntervalo=[]} = arquivoPrincipal

        const {anexos:{prePos="", intervalo=""}={}} = programa
        const {anexos:{bloco1=[],bloco2=[],bloco3=[],bloco4=[],bloco5=[],bloco6=[],}={}} = programa

        const listaArquivoPrePos = prePos ? await this.getArquivosEmLote([prePos,prePos]) : []

        const listaProgramaValuesParaIntervalo:any = []

        if(cortesParaIntervalo.length){

            cortesParaIntervalo.map(element => {
                listaProgramaValuesParaIntervalo.push(intervalo)
            });

        }

        const listaArquivosIntervalo = listaProgramaValuesParaIntervalo ? 
        await this.getArquivosEmLote(listaProgramaValuesParaIntervalo) : []

        const listaArquivosBloco1 = await this.getArquivosEmLote(bloco1)
        const listaArquivosBloco2 = await this.getArquivosEmLote(bloco2)
        const listaArquivosBloco3 = await this.getArquivosEmLote(bloco3)
        const listaArquivosBloco4 = await this.getArquivosEmLote(bloco4)
        const listaArquivosBloco5 = await this.getArquivosEmLote(bloco5)
        const listaArquivosBloco6 = await this.getArquivosEmLote(bloco6)

        const containerProgramasMontados = [
            {
                lista:"principal",
                arquivos:[arquivoPrincipal]
            },
            {
                lista:"intervalos",
                arquivos:listaArquivosIntervalo
            },
            {
                lista:"prePos",
                arquivos:listaArquivoPrePos
            },
            {
                lista:"bloco1",
                arquivos:listaArquivosBloco1
            },
            {
                lista:"bloco2",
                arquivos:listaArquivosBloco2
            },
            {
                lista:"bloco3",
                arquivos:listaArquivosBloco3
            },
            {
                lista:"bloco4",
                arquivos:listaArquivosBloco4
            },
            {
                lista:"bloco5",
                arquivos:listaArquivosBloco5
            },
            {
                lista:"bloco6",
                arquivos:listaArquivosBloco6
            }
        ]

            return containerProgramasMontados

    }

    async getArquivosPorCaterogia(categoria:string){

        const arquivoModel = this.arquivosPorCategoria[categoria];

        if (!arquivoModel) {
            throw new BadRequestException(`Categoria inválida: ${categoria}`);
        }

        let listaDeArquivos = await arquivoModel
        .find({})
        .lean()
        .exec();

        return listaDeArquivos

    }


}
