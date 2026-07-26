import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({_id:false})
export class Corte extends Document {

    @Prop()
    atracao:string

    @Prop()
    tituloAtracao:string

    @Prop()
    titulo:string

    @Prop()
    volume:number

    @Prop()
    horarioDeExibicao:string

    @Prop()
    duracaoTotalDaAtracaoEmSegundos:number

    @Prop()
    id:string

    @Prop()
    idProgMontado:string

    @Prop()
    tipo:string

    @Prop()
    indice:number

    @Prop()
    inicio:number

    @Prop()
    final:number

    @Prop()
    programaMontadoOrder:number

    @Prop()
    dia:string

}