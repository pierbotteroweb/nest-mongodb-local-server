import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { AnexosPrograma } from "./anexosPrograma.schema";

@Schema({collection: 'programasDeTv'})
export class Programa extends Document {

    @Prop()
    titulo:string

    @Prop()
    tipo:string

    @Prop()
    value:string

    @Prop()
    canal:string

    @Prop({type:[AnexosPrograma]})
    anexos?:AnexosPrograma

}