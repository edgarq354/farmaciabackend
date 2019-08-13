export interface HorarioInterface {
    id?: string;
    nombre_dia?: string;
    dia?: number;
    id_tbfarmacia?: number;
    hora_inicio?: string;
    hora_fin?: string;
    activo: number;
}


export class Horario {
    constructor(
       public id: string,
       public nombre_dia: string,
       public dia: number,
       public id_tbfarmacia: number,
       public hora_inicio: string,
       public hora_fin: string,
       public activo: boolean,
    ) { }
  }



