import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({_id: false})
export class AnexosPrograma extends Document {

    @Prop()
    titulo?:string

    @Prop()
    prePos?:string

    @Prop()
    intervalo?:string

    @Prop()
    blocosAmount?:number

    @Prop({type:[String]})
    bloco1?:string[]

    @Prop({type:[String]})
    bloco2?:string[]

    @Prop({type:[String]})
    bloco3?:string[]

    @Prop({type:[String]})
    bloco4?:string[]

    @Prop({type:[String]})
    bloco5?:string[]

    @Prop({type:[String]})
    bloco6?:string[]

}