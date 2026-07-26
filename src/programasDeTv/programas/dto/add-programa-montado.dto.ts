import { Corte } from "src/schemas/corte.schema";

export class AddProgramaMontadoDto {
  atracao: string;
  idProgMontado: string;
  horarioDeExibicao: string;
  cortes: Corte[];
  arquivo: string;
  tituloAtracao: string;
  tempoTotalEmSegundos: number;
  gradeOrder: number;
  tempoTotal: string;
  diaDaSemana: string;
  canal: string;
}
