export class Usuario {
    constructor(
      public id: string,
      public Nombre: string,
      public Usuario: string,
      public IdTbTipoUsuario: string,
      public IdTbNodo: string,
      public IdTbUsuarioNodo: string,
      public IdTbAplicacion: string,
      public IdCUarzo: string,
      public Nro: string,
      public TipoUsuario: string,
      public Permisos: any ,
    ) { }
  }
  export interface UsuarioModel {
   
    id?: string,
    Nombre?: string,
    Usuario?: string,
    IdTbTipoUsuario?: string,
    IdTbNodo?: string,
    IdTbUsuarioNodo?: string,
    IdTbAplicacion?: string,
    IdCUarzo?: string,
    Nro?: string,
    TipoUsuario?: string,
    Permisos?: any,
    Cargo?:any,
    IpMaquina?:any
}  
   export class Usuario2 {
    constructor(
      public Id: string,
      public Nombre: string,
      public Usuario: string,
      public IdTbTipoUsuario: string,
      public IdTbNodo: string,
      public IdTbUsuarioNodo: string,
      public IdTbAplicacion: string,
      public IdCUarzo: string,
      public Nro: string,
      public TipoUsuario: string,
      public Permisos: any ,
    ) { }
  } 
  
  export interface UsuarioInterface {
    id?: number;
    nombre?: string;
    apellido?: string;
    usuario?:string;
    contrasenia?:string;
    aplicacion?:string;
    celular?: string;
    correo?: string;
    imei?: string;
    codigo?: string;
    token?: string;
    id_tbfarmacia?: number;
    farmacia?:any;
    suceso?:number;
    mensaje?:string;
}




  