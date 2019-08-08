export interface InterfaceServicioModel {
     id?: string,
     FechaSolicitud?: string,
     FechaAceptado?: string,
     FechaCancelado?: string,
     FechaCompletado?: string,
     FechaCalificacion?: string,
     Detalle?: string,
     DetalleCancelo?: string,
     DetalleCalificacionFuncionario?: string,
     Calificacion?: string,
     TipoProblema?: string,
     Estado?: string,
     IdTbUsuario?: string,
     IdTbUsuarioOperador?: string,
     IdTbTipoProblema?: string,
     Funcionario?: string,
     Operador?: string,
     Problema?: string,
     Accion?: string
  }  
  export interface InterfaceServicioMensualModel {
   IdTbTipoProblema?: string,
   Nombre?: string,
   Tipo?: string,
   junior?: string,
   alex?: string,
   elder?: string
   
}  
