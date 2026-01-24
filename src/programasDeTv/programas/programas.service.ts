import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Arquivo } from 'src/schemas/arquivo.schema';
import { Programa } from 'src/schemas/programa.schema';
import { ProgramaMontado } from 'src/schemas/programaMontado.schema';

@Injectable()
export class ProgramasService {

    private readonly arquivosPorTipo: Record<string, Model<Arquivo>> 
    
    constructor(
        @InjectModel(Programa.name)
        private programaModel: Model<Programa>,

        @InjectModel(ProgramaMontado.name)
        private programasMontadosModel: Model<ProgramaMontado>,

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
        private readonly originaisModel: Model<Arquivo>,
    ){
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


    async findByValueProperty(value:string): Promise<Programa>{
        
        const programa = await this.programaModel.findOne({value}).exec()
        if(!programa) {
            throw new NotFoundException(                
                `Programa com value "${value}" não encontrado`,
            )
        }

        return programa
    }

    async getProgramasMontadosByCanalAndDiaDaSemanma(canal:string,diaDaSemana:string): Promise<ProgramaMontado[]>{
        
        const programasMontados = await this.programasMontadosModel.find({ canal, diaDaSemana })
        .lean()
        .exec()
        if(!programasMontados) {
            throw new NotFoundException(                
                `Programas Montados com value "${canal}" e "${diaDaSemana}" não encontrados`,
            )
        }

        return programasMontados
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

        const { value, tipo } = programa;

        const arquivoModel = this.arquivosPorTipo[tipo];

        if (!arquivoModel) {
            throw new BadRequestException(`Tipo inválido: ${tipo}`);
        }

        let arquivoToReturn = arquivoModel.findOne({
        programaDeTv,
        added: false,
        order: { $ne: null }
        })
        .sort({ order: 1 }).lean().exec();

        return arquivoToReturn
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