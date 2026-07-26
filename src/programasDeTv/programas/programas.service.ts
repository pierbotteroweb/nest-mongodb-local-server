import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Arquivo } from 'src/schemas/arquivo.schema';
import { Programa } from 'src/schemas/programa.schema';
import { ProgramaMontado } from 'src/schemas/programaMontado.schema';
import { AtualizaHorarioProgramaMontadoDto } from './dto/atualiza-horario-programa-montado.dto';
import { AddProgramaMontadoDto } from './dto/add-programa-montado.dto';
import { DeletaProgramaMontadoDto } from './dto/deleta-programa-montado.dto';
import { AtualizaGradeOrderProgramaMontadoDto } from './dto/atualiza-grade-order-programa-montado.dto';

@Injectable()
export class ProgramasService {

    private readonly arquivosPorTipo: Record<string, Model<Arquivo>> 
    
    constructor(
        @InjectModel(Programa.name)
        private programaModel: Model<Programa>,

        @InjectModel(ProgramaMontado.name)
        private programasMontadosModel: Model<ProgramaMontado>,
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

    async getAllProgramasMontados(): Promise<ProgramaMontado[]>{
        
        const programasMontados = await this.programasMontadosModel.find({})
        .lean()
        .exec()
        if(!programasMontados) {
            throw new NotFoundException(                
                `Programas Montados não encontrados`,
            )
        }
        return programasMontados
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

    async addProgramaMontado(dto: AddProgramaMontadoDto){
        
        const novoPrograma = await this.programasMontadosModel.create(dto);

        const listaProgramasMontadosAtualizada = this.programasMontadosModel.find({
            diaDaSemana: novoPrograma.diaDaSemana,
            canal: novoPrograma.canal
        })
        .lean()
        .exec();

        return novoPrograma
        
    }

    async atualizaHorarioDeProgramasMontados(listaDeHorarios:AtualizaHorarioProgramaMontadoDto[]){

       await this.programasMontadosModel.bulkWrite(
        listaDeHorarios.map(horario =>({
            updateOne: {
                filter: { idProgMontado: horario.idProgMontado },
                update: { $set: { horarioDeExibicao: horario.horarioDeExibicao } }
            }
        }))
       )

       return listaDeHorarios

    }

    async atualizaGradeOrderDeProgramasMontados(listaDeGradeOrders:AtualizaGradeOrderProgramaMontadoDto[]){

       await this.programasMontadosModel.bulkWrite(
        listaDeGradeOrders.map(horario =>({
            updateOne: {
                filter: { idProgMontado: horario.idProgMontado },
                update: { $set: { gradeOrder: horario.gradeOrder } }
            }
        }))
       )

       return listaDeGradeOrders

    }

    async deletaProgramasMontados(idsProgramasMontados:string[]){
        await this.programasMontadosModel.deleteMany({
            idProgMontado: { $in: idsProgramasMontados }
        })

        return idsProgramasMontados
    }

    async deleteProgramaMontado(idProgMontado:string){
        await this.programasMontadosModel.deleteOne({
            idProgMontado: idProgMontado
        })

        return {idProgMontado:idProgMontado}
    }


    timeToSec(hora) {
        const [hh, mm, ss] = hora.split(':').map(Number);
        return hh * 3600 + mm * 60 + ss;
    }

    secToTime(hora){
        return new Date(hora * 1000).toISOString().substring(11, 19);
    }

    calculaHorario(horario: string, acrescimo: number): string {
        const TOTAL_SEGUNDOS_DIA = 86400;

        let segundos = this.timeToSec(horario) + acrescimo;

        segundos = ((segundos % TOTAL_SEGUNDOS_DIA) + TOTAL_SEGUNDOS_DIA) % TOTAL_SEGUNDOS_DIA;

        return this.secToTime(segundos);
    }
}