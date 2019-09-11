export interface FarmaciaInterface {
    id?: string;
    nombre?: string;
    direccion_logo?: string;
    direccion_banner?: string;
    razon_social?: string;
    nit?:string;
    correo?:string;
    telefono?: string;
    direccion?: string;
    fecha_registro?: string;
    calificacion?: string;
    ranking?: string;
    id_tbcomentario?: string;
    latitud?: string;
    longitud?: string;
    indicacion?: string;
    abierto_cerrado?:string;
    turno?:string;
    activo?:boolean;
}

export interface FarmaciaTurnoInterface {
    id?: string;
    nombre_dia?: string;
    dia?: number;
    id_tbfarmacia?: number;
    hora_inicio?: string;
    hora_fin?: string;
    activo?: number;
    cantidad?: number;
    idtbfarmacia?:number,
    idtbturno?:number
}
 







