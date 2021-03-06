export interface FarmaciaInterface {
    id?: string;
    nombre?: string;
    direccion_logo?: string;
    direccion_banner?: string;
    razon_social?: string;
    nit?:string;
    correo?:string;
    telefono?: string;
    celular?: string;
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
    sw_turno?:boolean;
    idtbturno?:number;
}

export interface FarmaciaTurnoInterface {
    id?: string;
    nombre_dia?: string;
    fecha?: string;
    dia?: number;
    id_tbfarmacia?: number;
    hora_inicio?: string;
    hora_fin?: string;
    activo?: boolean;
    cantidad?: number;
    idtbfarmacia?:number,
    idtbturno?:number
}
 







