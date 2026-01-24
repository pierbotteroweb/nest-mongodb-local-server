import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection: 'dublado'})
export class Arquivo extends Document {
    
    @Prop()
    tituloAtracao:string
    
    @Prop()
    order:number
    
    @Prop()
    tipo:string
    
    @Prop()
    added:boolean
    
    @Prop()
    duracao:string
    
    @Prop()
    programaDeTv:string
    
    @Prop()
    canal:string
    
    @Prop()
    titulo:string
    
    @Prop()
    cortesParaIntervalo:number[]
    
    @Prop()
    corteFinal:number
    
    @Prop()
    corteInicio:number
    
    @Prop()
    emUso:boolean
}

export const ArquivoSchema = SchemaFactory.createForClass(Arquivo)