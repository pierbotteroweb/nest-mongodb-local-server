import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Corte } from "./corte.schema";

@Schema({collection: 'programasMontados'})
export class ProgramaMontado extends Document {

    @Prop()
    atracao:string

    @Prop()
    idProgMontado:string

    @Prop()
    horarioDeExibicao:string
    
    @Prop({type:[Corte]})
    cortes:Corte[]

    @Prop()
    arquivo:string

    @Prop()
    tituloAtracao:string

    @Prop()
    tempoTotalEmSegundos:number

    @Prop()
    tempoTotal:string

    @Prop()
    diaDaSemana:string

    @Prop()
    canal:string

    @Prop()
    gradeOrder:number

}

export const ProgramaMontadoSchema = SchemaFactory.createForClass(ProgramaMontado)