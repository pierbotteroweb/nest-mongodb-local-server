import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Bloco } from "./bloco.schema";

@Schema({collection: 'programasMontados'})
export class ProgramaMontado extends Document {

    @Prop()
    atracao:string

    @Prop()
    idProgMontado:string

    @Prop()
    horarioDeExibicao:string
    
    @Prop({type:[Bloco]})
    blocos:Bloco

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

}

export const ProgramaMontadoSchema = SchemaFactory.createForClass(ProgramaMontado)