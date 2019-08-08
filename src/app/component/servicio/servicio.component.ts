
import { Component , OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Funciones Globales
import { GLOBAL,DataTables } from '../../servicios/global';
import { globalFunciones } from '../../servicios/globalFunciones';


// llamo a los servicios de Usuario
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Usuario2 } from '../../models/usuario.model';
// llamo a los servicios de Tipo de Problema
import { TipoProblemaService } from '../../servicios/tipoproblema.service';
import { InterfaceTipoProblemaModel } from '../../models/tipoproblema.model';

// llamo a los servicios
import { ServicioService } from '../../servicios/servicio.service';
import { InterfaceServicioModel } from '../../models/servicio.model';

// llamo a las Acciones
import { AccionService } from '../../servicios/accion.service';
import { AccionModel } from '../../models/accion.model';

 
//Llama al servicio de Usuarios.
import { ConfiguracionService } from '../../servicios/configuracion.service';
import { InterfaceConfiguracionModel } from '../../models/configuracion.model';


//codigo de encriptacion 
import * as CryptoJS from 'crypto-js';
 
//lodash- para filtrado de array
import * as _ from 'lodash' 



import * as moment_ from 'moment';
export const moment =  moment_["default"];

// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $:any;
 
 

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  providers: [
    ServicioService, 
    TipoProblemaService,
    UsuarioService,
    AccionService,
    globalFunciones,
    ConfiguracionService] 
})


export class ServicioComponent  implements OnInit{
    // Decorator wires up blockUI instance
    @BlockUI() blockUI: NgBlockUI;

  public titulo: string;
  public fecha: string;
  public fguardar:boolean;
  public mensaje : string;
  public pin: string;   
  public session: Usuario2;  
  public Opcion: string;  
  public opcionFuncionario: string;  
  public Calificacion: string;  

  public servicio: InterfaceServicioModel;
  public servicios : InterfaceServicioModel[];
  public servicios_en_proceso : InterfaceServicioModel[];
  public servicios_completados : InterfaceServicioModel[];
  public servicios_cancelados : InterfaceServicioModel[];

  //Lista de Tipo de Probleam en configuracion
  public listaConfiguracionTipoProblema : InterfaceConfiguracionModel[];


  public listaAcciones : AccionModel[];
  public accion : AccionModel;
  public cbFinalizar:boolean;
  
  public tipoproblema: InterfaceTipoProblemaModel;
  public tipoproblemas : InterfaceTipoProblemaModel[]; 
  public listaProblemas : InterfaceTipoProblemaModel[]; 
  public tiposervicios : InterfaceTipoProblemaModel[]; 

 

  //variable para usuarios operadores
  public usuario: Usuario;
  public usuarios: Usuario[]; 

  //variable para usuarios Funcionarios
  public usuarioFuncionario: Usuario;
  public usuarioFuncionarios: Usuario[]; 

  //variable lista de usuarios a migrar
  public listaUsuarioMigracion:any;
  public spinMigrar:boolean;


  /*
  Valiables temporales que obtienes los datos del LocalStorage de inicio de sesion.
  */
  public id_usuario:string;
  public TipoUsuario_:string;

 public swVer:boolean=false;
 public swSinAtender:boolean=false;
 public swEnProceso:boolean=false;
 public swCompletado:boolean=false;
 public swCancelado:boolean=false;
 public seleccionarTipo:string="";
 public seleccionarProblema:string="";
 public seleccionarEstado:string="SIN ATENDER";
 public swVerificarSeleccionOperador:boolean=false;
 

  constructor(
    private _router: Router,
    private _servicioService: ServicioService,
    private _accionService: AccionService,
    private _usuarioService: UsuarioService,
    private _tipoproblemaService: TipoProblemaService,
    private _globalFuncion: globalFunciones,
    private _configuracionService: ConfiguracionService
    ) { 
        //GLOBAL.session=sjcl.decrypt("encryptDatosUser", JSON.parse(sessionStorage.getItem("datosUser")));
        if( sessionStorage.getItem("datosUser")==null){
          _router.navigate(['/' ]);
      } else{
      
      GLOBAL.session=JSON.parse(this.decryptData(sessionStorage.getItem("datosUser"),"encryptDatosuser"));
      this.titulo = '';        
      this.pin= GLOBAL.pin;
      this.session=GLOBAL.session;

      //adicionamos los valores de a localStorage de inicio de sesion en las variables locales
      this.id_usuario=this.session.Id;
      this.TipoUsuario_=this.session.TipoUsuario;


      this.servicio=  {
        id:null,
        FechaSolicitud:'',
        FechaAceptado:'',
        FechaCancelado:'',
        FechaCompletado:'',
        FechaCalificacion:'',
        Detalle:'',
        DetalleCancelo:'',
        DetalleCalificacionFuncionario:'',
        Calificacion:'',
        TipoProblema:'',
        Estado:'',
        IdTbUsuario:'',
        IdTbUsuarioOperador:'',
        IdTbTipoProblema:'',
        Funcionario:'',
        Operador:'',
        Problema:'',
        Accion:null
      };
      
      this.servicios=[];  
      this.mensaje="";
      this.Opcion="Todos";
      this.opcionFuncionario="";
      this.Calificacion="BUENO";
      
      this.tipoproblema={
        id:null,
        Nombre:'',
        Tipo:''
      };
      this.tipoproblemas=[];
      this.listaProblemas=[];
      this.tiposervicios=[];

      //variable de Tipos de problemas 
      
      this.usuario=new Usuario(null,'','','','','','','','','','');
      this.usuarios=[];

      this.usuarioFuncionario=new Usuario(null,'','','','','','','','','','');
      this.usuarioFuncionarios=[];

      //variable de Lista de Tipo de Problema de la tala de configuracion
      this.listaConfiguracionTipoProblema=[];

      this.accion={
        length:null,
        Id:null,
        Detalle:'',
        Fecha:'',
        IdTbUsuarioOperador:null,
        IdTbServicio:null,
        IdTbTipoProblema:null 
      };

      this.listaAcciones=[];
    
      let fecha =Date();
      const dateStringFin = moment(fecha).format('YYYY-MM-DD');
      this.fecha=dateStringFin;

      //variable para definir que vista visualizar
      this.fguardar=false;

      this.swVer=false;
      this.swSinAtender=false;
      this.swEnProceso=false;
      this.swCompletado=false;
      this.swCancelado=false;
      this.cbFinalizar=false;
      this.spinMigrar=false;
     
     } 
    }

   
   

    ngOnInit() {
      
      switch(this.TipoUsuario_)
      {
        case 'Administrador':
        this.listarOperador();
        this.listarUsuario();
        this.listarServicios_sin_atender();
        this.listarTipos();
        break;
        case 'Operador':
        this.listarUsuario();
        this.listarServicios_sin_atender();
        this.listarTipos();
        break;
        case 'Funcionario':
        this.listarOperador();
        this.listarServicios_sin_atender();
        this.listarTipos();
        break;
      }
     
      this.listarConfiguracionTipoProblema();
    }





    
//******************************************************************************* */
// EVENTOS DESDE EL FORMULARIO
//******************************************************************************* */

// evento al dar click al boton guardar SERVICIO
insertarORmodificarServicio(idModal,isValid:boolean){
  if(isValid){
    $('#'+idModal).modal('hide'); 
    if(this.servicio.Detalle.length>=3){
      if(this.Opcion.length>3){
        if(this.servicio.id==null){   
          /*this.mensaje='insertar -> ' 
                                + 'DescripcionEspacio: '+ this.espacio.Descripcion;*/   
          this.insertarServicio();        
        }else{
          /*this.mensaje='modificar -> ' 
                                + 'Id: '+ this.espacio.Id + ','
                                + 'Descripcion: '+ this.espacio.Descripcion;*/
          
          this.modificarServicio();
        }
      }else{
        this._globalFuncion.alertError("Seleccion el Operador");
      }
    }else{
     this._globalFuncion.alertError("Ingresa la descripción del problema");
    }      
  }
}


// evento al dar click al boton guardar SERVICIO del a ASIGNACION
AsignarOperador(){    
  this.servicio.IdTbUsuarioOperador=this.Opcion;
  this._servicioService.modificarServicio(
                                          this.pin, 
                                          this.servicio.id, 
                                          this.servicio.IdTbUsuarioOperador,
                                          "",
                                          "Aceptar",
                                          this.session 
                                       ).subscribe(            
    result => {        
     
   this.ngOnInit();
      this._globalFuncion.alertExito(result.Dato);
    },
    error => {
      this._globalFuncion.alertError(error);
    }
  ) 
  
}

// metodo para insertar SERVICIO
/*

*/
insertarServicio(){

 

  switch(this.TipoUsuario_)
  {
    case 'Administrador': 
    this.servicio.IdTbUsuario=this.opcionFuncionario;
    this.servicio.IdTbUsuarioOperador=this.Opcion;
    this.servicio.Estado=this.seleccionarEstado;
    break;
    case 'Operador': 
    this.servicio.IdTbUsuario=this.opcionFuncionario;
    this.servicio.IdTbUsuarioOperador=this.id_usuario;
    this.Opcion=this.id_usuario;
    this.servicio.Estado=this.seleccionarEstado;
    break;
    case 'Funcionario': 
    this.servicio.IdTbUsuario=this.id_usuario;
    this.servicio.IdTbUsuarioOperador=this.Opcion;
    this.servicio.Estado="SIN ATENDER";
    break;
  }
 
 this.servicio.IdTbTipoProblema=this.seleccionarProblema;

if(this.servicio.Estado!="SIN ATENDER"&&this.servicio.IdTbUsuarioOperador=="Todos")
{
this.swVerificarSeleccionOperador=true;
}

if(this.swVerificarSeleccionOperador==false){
if(this.servicio.IdTbUsuario.length>0){
 if(this.seleccionarTipo.length>0){
  if(this.seleccionarProblema.length>0){
    if(this.Opcion.length>0){
      this. blockUI.start("Cargando...");
      this._servicioService.insertarServicio(
                                            this.pin, 
                                            this.servicio.Detalle,
                                            this.seleccionarTipo,
                                            this.servicio.IdTbUsuario,
                                            this.servicio.IdTbUsuarioOperador,
                                            this.servicio.IdTbTipoProblema,
                                            this.Opcion,
                                            this.servicio.Estado,
                                            this.session 
                                          ).subscribe(            
        result => {
          this.blockUI.stop();    
          this._globalFuncion.alertExito(result.Dato);    
          this.ngOnInit();
        
        },
        error => {
          this.blockUI.stop();
          this._globalFuncion.alertError(error);
        }
      )
      }else{
        this.showNotification('top','center','Seleccione a quien desea solicitar');
      }
  }else{
    this.showNotification('top','center','Seleccionar el Problema' );
  }
}else{
  this.showNotification('top','center','Seleccione el Tipo de Problema');
}
}else{
  this.showNotification('top','center','Seleccione un Funcionario');
}
}else{
  this.showNotification('top','center','Seleccione un Operador');
}
}


insertarAccion(idModal,isValid:boolean){
  if(isValid==true){
    $("#"+idModal).modal('hide');

  this.accion.IdTbServicio=this.servicio.id;
  this.accion.IdTbUsuarioOperador=this.servicio.IdTbUsuarioOperador;
  this.accion.IdTbTipoProblema=this.servicio.IdTbTipoProblema;
  console.log("tp:"+this.servicio.IdTbTipoProblema);
if(this.accion.Detalle.length>3)
{
  this.blockUI.start('Cargando...');
      this._accionService.insertarAccion( this.pin, 
        this.accion.Detalle,
        this.accion.IdTbUsuarioOperador, 
        this.accion.IdTbServicio,
        this.accion.IdTbTipoProblema
                                          ).subscribe(            
        result => {        
          this._globalFuncion.alertExito(result.Dato);
          if(this.cbFinalizar==true)
          {
            this.finalizarServicio();
          }
          this.ngOnInit();
          this.limpiar_Accion();
          this.blockUI.stop();
        },
        error => {
          this.blockUI.stop();
          this._globalFuncion.alertError(error);
        }
      )
      }else{
        this.showNotification('top','center','Ingrese un detalle');
      }
    }
    }



// metodo para aceptar SERVICIO
aceptarServicio(index){
  this.servicio=this.servicios[index];
  this.servicio.IdTbUsuarioOperador=this.id_usuario;
  this.blockUI.start('Cargando...');
  this._servicioService.modificarServicio(
                                          this.pin, 
                                          this.servicio.id, 
                                          this.servicio.IdTbUsuarioOperador,
                                          "",
                                          "Aceptar",
                                          this.session 
                                       ).subscribe(            
    result => {        
     
   this.ngOnInit();
   this.blockUI.stop();
      this._globalFuncion.alertExito(result.Dato);
    },
    error => {
      this.blockUI.stop();
      this._globalFuncion.alertError(error);
    }
  ) 
  
 
}

// metodo para finalizar SERVICIO
finalizarServicio(){
  this.blockUI.start('Cargando...');
  this._servicioService.modificarServicio(
    this.pin, 
    this.servicio.id, 
    this.servicio.IdTbUsuarioOperador,
    "",
    "Completar",
    this.session 
 ).subscribe(    
    result => {        
      this.blockUI.stop();
      this._globalFuncion.alertExito(result.Dato);
      this.listarServicios_en_proceso();
    },
    error => {
      this.blockUI.stop();
      this._globalFuncion.alertError(error);
    }
  )    
}

// metodo para modificar SERVICIO
modificarServicio(){
    this.blockUI.start('Cargando...');
        this._servicioService.modificarServicio(
          this.pin, 
          this.servicio.id, 
          this.servicio.IdTbUsuarioOperador,
          this.servicio.Detalle,
          "Actualizar",
          this.session 
       ).subscribe(            
    result => {        
    this.blockUI.stop();
    this.ngOnInit();
    this._globalFuncion.alertExito(result.Dato);
    },
    error => {
      this.blockUI.stop();
    this._globalFuncion.alertError(error);
    }
    ) 

}

// evento al dar click al boton CANCELAR SERVICIO
cancelarServicio(){

  if(this.servicio.DetalleCancelo.length>=3){
    if(this.servicio.id!=null){   
      this.blockUI.start('Cargando...');
  this._servicioService.cancelarServicio(
                                          this.pin, 
                                          this.servicio.id, 
                                          this.servicio.DetalleCancelo, 
                                          this.session 
                                       ).subscribe(            
    result => {        
      this.blockUI.stop();
      this._globalFuncion.alertExito(result.Dato);
      this.ngOnInit();
    },
    error => {
      this.blockUI.stop();
      this._globalFuncion.alertError(error);
    })   
    }else{
      this.showNotification('top','center','Seleccione el servicio');
    }
  }else{
    this.showNotification('top','center','Para registrar un servicio necesita seleccionar al menos un Tipo de Problema. ' );
  }
}

// evento al dar click al boton CALIFICAR SERVICIO
calificarServicio(){
this.servicio.Calificacion=this.Calificacion;
  if(this.servicio.DetalleCalificacionFuncionario.length>=3){
    if(this.servicio.id!=null){   
      this.blockUI.stop();
  this._servicioService.calificarServicio(
                                          this.pin, 
                                          this.servicio.id, 
                                          this.servicio.DetalleCalificacionFuncionario, 
                                          this.servicio.Calificacion, 
                                          this.session 
                                       ).subscribe(            
    result => {     
      this.blockUI.stop();   
      this._globalFuncion.alertExito(result.Dato);
      this.ngOnInit();
      this.listarServicios_completado();
    },
    error => {
      this.blockUI.stop();
     this._globalFuncion.alertError(error);
    })   
    }else{
      this.showNotification('top','center','Seleccione el servicio');
    }
  }else{
    this.showNotification('top','center','Para registrar un servicio necesita seleccionar al menos un Tipo de Problema. ' );
  }
}



// metodo para cargar la lista de configuracion "TipoProblema"
listarConfiguracionTipoProblema(){
  // Start blocking

let jsonData={"Variable":"TipoProblema"};
this._configuracionService.listarConfiguracion(this.pin,jsonData).subscribe(            
  result => {        
    if (result.Exito != 1) {
      this.mensaje = result.Dato;          
    }else{
     //  console.log("TipoProblema:"+result.Dato);
      this.listaConfiguracionTipoProblema=result.Dato; 
    }
  },
  error => {
    this._globalFuncion.alertError("Error de conexión!");
  }
)
}


    // metodo para cargar la lista de Tipos
listarTipos(){
  let jsonData={"opcion":"Lista"};
  this._tipoproblemaService.listarTipo(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        //console.log(result.Dato);
        
        this.tipoproblemas=result.Dato;  
        
      }       
      if(this.swVer==true){
        $('#datatables').dataTable().fnDestroy();
        }else{
          this.swVer=true;
        }
        
      setTimeout(function(){
        
            $('#datatables').dataTable(DataTables);
            $('[rel="tooltip"]').tooltip();
          },500);    
      this.limpiar_TipoProblema();
      
    },
    error => {
      this._globalFuncion.alertError(error);
    }
  )
}

listarAccionesServicio(idServicio ){
  let jsonData={"opcion":"IdTbServicio",
                "IdTbServicio":idServicio};

  this._accionService.listarAccion(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        //console.log(result.Dato);
        this.listaAcciones=result.Dato;  
      }       
   
    },
    error => {
      this._globalFuncion.alertError(error);
    }
  )
}

listarAccionesPorTipoProblema(IdTbTipoProblema){
  let jsonData={"opcion":"IdTbTipoProblema",
                "IdTbTipoProblema":IdTbTipoProblema};

  this._accionService.listarAccion(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        //console.log(result.Dato);
        this.listaAcciones=result.Dato;  
      }       
   
    },
    error => {
      this._globalFuncion.alertError(error);
    }
  )
}

    // metodo para cargar la lista de Tipos servicios
    listarTiposServicios(IdServicio){
      let jsonData={"opcion":"IdTipoServicio","IdServicio":IdServicio};
      this._tipoproblemaService.listarTipo(this.pin,jsonData).subscribe(            
        result => {        
          if (result.Exito != 1) {
            this.mensaje = result.Dato;  
            //console.log(result.Dato);       
          }else{
            //console.log(result.Dato);
            
            this.tiposervicios=result.Dato;                    
          }       

          
 



          this.limpiar_TipoProblema();
        },
        error => {
          this._globalFuncion.alertError(error);
        }
      )
    }


//metodo para obtener lista de Usuario Funcionario
listarUsuario(){
  let jsonData={
    "opcion":"Tipo",
  "tipo_usuario":"Funcionario"
};

  this._usuarioService.listarUsuario(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        //console.log(result.Dato);
        
        this.usuarioFuncionarios=result.Dato;      
        
        setTimeout(() => {
          this.updated(); 
        }, 500);
      }       
      this.limpiar_Usuario_funcionarios();
    },
    error => {
      this._globalFuncion.alertError(error);
    }
  )
}

 


//metodo para obtener lista de Operadores
listarOperador(){
  let jsonData={
    "opcion":"Tipo",
  "tipo_usuario":"Operador"
};

  this._usuarioService.listarUsuario(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        //console.log(result.Dato);
        this.usuarios=result.Dato;                    
      }       
      setTimeout(() => {
        this.updated(); 
      }, 500);
      this.limpiar_Usuarios();
    },
    error => {
      this._globalFuncion.alertExito(error);
    }
  )
}

    // metodo para cargar la lista de Servicios sin atender
listarServicios_sin_atender(){
  let fecha=new Date();
  let fecha_2=fecha.getDate() - 30;
  const dateStringFin = moment(fecha).format('YYYY-MM-DD');
  const dateStringInicio = moment(fecha_2).format('YYYY-MM-DD');
  let FechaInicio=dateStringInicio;
  let FechaFin=dateStringFin;

  //console.log(FechaInicio);
  //console.log(FechaFin);
 
  let jsonData={
    "opcion":"Lista",
    "tipousuario":this.TipoUsuario_,
    "estado":"Sin atender",
    "FechaInicio":FechaInicio,
    "FechaFin":FechaFin,
    "IdTbUsuario":this.id_usuario,
    "IdTbUsuarioOperador":this.id_usuario
  };

  this._servicioService.listarServicio(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
     //console.log(result.Dato);
        this.servicios=result.Dato;    
     //   console.log("swSinAtender Antes:",this.swSinAtender);
             if(this.swSinAtender==true){
            $('#DtSinAtender').dataTable().fnDestroy();
            }{
            this.swSinAtender=true; 
          }
          //console.log("swSinAtender Despues:",this.swSinAtender);
          //console.log("Lista sin atender:",JSON.stringify(this.servicios));
        setTimeout(function(){
              $('#DtSinAtender').dataTable(DataTables);
              $('[rel="tooltip"]').tooltip();
            },500);
             
      } 
      
      this.limpiar();
            
     
    },
    error => {
      this._globalFuncion.alertError(error);
    }
  )
}

/*
verficarSincronicacionDeTablas(index,total,idTabla,tipoTabla)
{  
  if(index>=total){
 

switch(tipoTabla){
  case 1:if(this.swSinAtender==true){
    $('#'+idTabla).dataTable().fnDestroy();
    }
    this.swSinAtender=true;
    break;
    case 2:if(this.swEnProceso==true){
      $('#'+idTabla).dataTable().fnDestroy();
      }
      this.swEnProceso=true;
      break;
      case 3:if(this.swCompletado==true){
        $('#'+idTabla).dataTable().fnDestroy();
        }
        this.swCompletado=true;
        break;  
        case 4:if(this.swCancelado==true){
          $('#'+idTabla).dataTable().fnDestroy();
          }
          this.swCancelado=true;
          break;  
          case 5:if(this.swVer==true){
            $('#'+idTabla).dataTable().fnDestroy();
            }
            this.swVer=true;
            break;  
}

  
    $('#'+idTabla).dataTable(DataTables);
    $('[rel="tooltip"]').tooltip();
  }
}

*/
 // metodo para cargar la lista de Servicios en proceso
 listarServicios_en_proceso(){
  let fecha=new Date();
  let fecha_2=fecha.getDate() - 30;
  const dateStringFin = moment(fecha).format('YYYY-MM-DD');
  const dateStringInicio = moment(fecha_2).format('YYYY-MM-DD');
  let FechaInicio=dateStringInicio;
  let FechaFin=dateStringFin;

  //console.log(FechaInicio);
  //console.log(FechaFin);
 
  let jsonData={
    "opcion":"Lista",
    "tipousuario":this.TipoUsuario_ ,
    "estado":"En proceso",
    "FechaInicio":FechaInicio,
    "FechaFin":FechaFin,
    "IdTbUsuario":this.id_usuario,
    "IdTbUsuarioOperador":this.id_usuario
  };

//console.log(JSON.stringify(jsonData));

  this._servicioService.listarServicio(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        //console.log(result.Dato);
        this.servicios_en_proceso=result.Dato;    
        if(this.swEnProceso==true){
          $('#DtEnProceso').dataTable().fnDestroy();
          }else{
          this.swEnProceso=true;
        }
        setTimeout(function(){
              $('#DtEnProceso').dataTable(DataTables);
              $('[rel="tooltip"]').tooltip();
            },500);             
      }       
 

      this.limpiar();
    },
    error => {
     
      this._globalFuncion.alertError(error);
    }
  )
}



 // metodo para cargar la lista de Servicios completado
 listarServicios_completado(){
  let fecha=new Date();
  let fecha_2=fecha.getDate() - 30;
  const dateStringFin = moment(fecha).format('YYYY-MM-DD');
  const dateStringInicio = moment(fecha_2).format('YYYY-MM-DD');
  let FechaInicio=dateStringInicio;
  let FechaFin=dateStringFin;

  //console.log(FechaInicio);
  //console.log(FechaFin);
 
  let jsonData={
    "opcion":"Lista",
    "tipousuario":this.TipoUsuario_,
    "estado":"Completado",
    "FechaInicio":FechaInicio,
    "FechaFin":FechaFin,
    "IdTbUsuario":this.id_usuario,
    "IdTbUsuarioOperador":this.id_usuario
  };

  this._servicioService.listarServicio(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        //console.log(result.Dato);
        this.servicios_completados=result.Dato;   
        
        if(this.swCompletado==true){
          $('#DtCompletado').dataTable().fnDestroy();
          }else{
            this.swCompletado=true;
          }
          
        setTimeout(function(){
              $('#DtCompletado').dataTable(DataTables);
              $('[rel="tooltip"]').tooltip();
            },500);    
      }            
      this.limpiar();
    },
    error => {
      this._globalFuncion.alertError(error);
    }
  )
}



 // metodo para cargar la lista de Servicios cancelados
 listarServicios_cancelado(){
  let fecha=new Date();
  let fecha_2=fecha.getDate() - 30;
  const dateStringFin = moment(fecha).format('YYYY-MM-DD');
  const dateStringInicio = moment(fecha_2).format('YYYY-MM-DD');
  let FechaInicio=dateStringInicio;
  let FechaFin=dateStringFin;

  //console.log(FechaInicio);
  //console.log(FechaFin);
 
  let jsonData={
    "opcion":"Lista",
    "tipousuario":this.TipoUsuario_,
    "estado":"Cancelado",
    "FechaInicio":FechaInicio,
    "FechaFin":FechaFin,
    "IdTbUsuario":this.id_usuario,
    "IdTbUsuarioOperador":this.id_usuario
  };
 // console.log(JSON.stringify(jsonData));
  this._servicioService.listarServicio(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
       //console.log(result.Dato);
        this.servicios_cancelados=result.Dato;                    
      } 
      
      if(this.swCancelado==true){
        $('#DtCancelado').dataTable().fnDestroy();
        }else{
          this.swCancelado=true;  
        }
        
      setTimeout(function(){
       
            $('#DtCancelado').dataTable(DataTables);
            $('[rel="tooltip"]').tooltip();
          },500);        
      this.limpiar();
    },
    error => {
      this._globalFuncion.alertError(error);
    }
  )
}
 

//cargar un servicio de una lista de servicios
cargarOReliminar(valor, opcion){                   
  this.servicio=this.servicios[valor];
  this.mensaje='Preparado para modificar: ' + (valor+1);
  if(opcion){            
    //elimina cuando la opcion es cargada con TRUE
  }     
  setTimeout(() => {
    this.updated(); 
  }, 500);
}  


cargarEnProceso(valor, opcion){                   
  this.servicio=this.servicios_en_proceso[valor];
}  
 
cargarCancelado(valor, opcion){                   
  this.servicio=this.servicios_cancelados[valor];
}  

//cargar un servicio de una lista de servicios completado
cargarCompletado(valor, opcion){                   
  this.servicio=this.servicios_completados[valor];
  this.mensaje='Preparado para modificar: ' + (valor+1);
  if(opcion){            
    //elimina cuando la opcion es cargada con TRUE
  }     
}  





// limpiamos los elementos
limpiar(){
  this.servicio= {
    id:null,
    FechaSolicitud:'',
    FechaAceptado:'',
    FechaCancelado:'',
    FechaCompletado:'',
    FechaCalificacion:'',
    Detalle:'',
    DetalleCancelo:'',
    DetalleCalificacionFuncionario:'',
    Calificacion:'',
    TipoProblema:'',
    Estado:'',
    IdTbUsuario:'',
    IdTbUsuarioOperador:'',
    IdTbTipoProblema:'',
    Funcionario:'',
    Operador:'',
    Problema:'',
    Accion:null
  };
  
  this.mensaje='';
}
 
// limpiamos los elementos
limpiar_TipoProblema(){
  this.tipoproblema={
    id:null,
    Nombre:'',
    Tipo:''
  };
  this.mensaje='';
}

// limpiamos los elementos
limpiar_Usuarios(){
  this.usuario=new Usuario(null,'','','','','','','','','','');
  this.mensaje='';
}

// limpiamos los elementos
limpiar_Usuario_funcionarios(){
  this.usuarioFuncionario=new Usuario(null,'','','','','','','','','','');
  this.mensaje='';
}

// limpiamos los elementos
/*
limpiar_CProblema(){
  this.TbTipoProblema=[];
  this.mensaje='';
}
*/
// limpiamos los elementos
limpiar_Accion(){
  this.accion={
        length:null,
        Id:null,
        Detalle:'',
        Fecha:'',
        IdTbUsuarioOperador:null,
        IdTbServicio:null,
        IdTbTipoProblema:null 
      };
  this.mensaje;
}

 
 



showNotification(from, align,mensaje){
  //notificacion
  var type = ['','info','success','warning','danger'];

  var color =4;

$.notify({
    icon: "pe-7s-gift",
    message: mensaje

  },{
      type: type[color],
      timer: 400,
      placement: {
          from: from,
          align: align
      }
  });
}




encryptData(data,key) {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  } catch (e) {
   //console.log(e);
  }
}

decryptData(data,key) {
  try {
    const bytes = CryptoJS.AES.decrypt(data, key);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e) {
   //console.log(e);
  }
}

CargarListaProblemas()
{
  
  let tipo=this.seleccionarTipo;
  var lista = _.filter(this.tipoproblemas, function(user) {
    return user.Tipo== tipo;
  });
  this.listaProblemas=lista;
  setTimeout(() => {
    this.updated(); 
  }, 500);
}

updated() {
      $('.selectpicker').selectpicker('refresh');
    }
}