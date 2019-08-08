import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// funciones globales
import { GLOBAL,DataTables } from '../../servicios/global';
import { globalFunciones } from '../../servicios/globalFunciones';
// llamo a los servicios
import { ConfiguracionService } from '../../servicios/configuracion.service';
import {  InterfaceConfiguracionModel } from '../../models/configuracion.model';
 
// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';

 
declare var $:any;

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  providers: [ConfiguracionService, globalFunciones],
})
export class ConfiguracionComponent  {
  // Decorator wires up blockUI instance
  @BlockUI() blockUI: NgBlockUI;

  public titulo: string;
  public name: string;
  public mensaje : string;
  public pin: string;  

  public configuracion: InterfaceConfiguracionModel;
  public listaConfiguracion : InterfaceConfiguracionModel[]; 
 
  public swVer:boolean=false;
 


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _globalFuncion:globalFunciones,
    private _configuracionService: ConfiguracionService) {
      if( sessionStorage.getItem("datosUser")==null){
        _router.navigate(['/' ]);
    } else{

      this.titulo = 'Configuracion';        
      this.pin= GLOBAL.pin;
      this.configuracion={
        Variable:'',
        Dato:'',
        Active:'',
        SessionUser:''
      };

      this.listaConfiguracion=[];  
      this.mensaje=""; 
     this.swVer=false;
    }

  }

  ngOnInit() {
   this.listarConfiguraciones();
  }

verificarDatos()
{
  return false;
}


ngAfterViewInit(){
    // Init Tooltips
    $('[rel="tooltip"]').tooltip();
}


listarConfiguracionPorVariable(Variable){
  let jsonData={"Variable":Variable};

  this._configuracionService.listarConfiguracion(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        //console.log(result.Dato);
        this.configuracion=result.Dato;  
      }       
   
    },
    error => {
      this._globalFuncion.alertError("Error de conexión!");
    }
  )
}

// metodo para cargar la lista de Tipos
listarConfiguraciones(){
    // Start blocking
  this.blockUI.start('Cargando...'); 

  let jsonData={"consulta":"Todo"};
  this._configuracionService.listarConfiguracionTabla(this.pin,jsonData).subscribe(            
    result => {   
      console.log("r:"+JSON.stringify(result));     
      if (result.Exito != 1) {
        this.mensaje = result.Dato;  
        console.log(this.mensaje);        
      }else{
        console.log("Configuraciones:"+result.Dato);
        
        this.listaConfiguracion=result.Dato; 
        if(this.swVer==true){
          $('#datatables').dataTable().fnDestroy();
        }else{
          this.swVer=true;
        }

        setTimeout(function(){
          $('#datatables').dataTable(DataTables);
        $('[rel="tooltip"]').tooltip();
      },0);
      }
      this.blockUI.stop(); 
    },
    error => {
      this.blockUI.stop(); 
      this._globalFuncion.alertError("Error de conexión!");
    }
  )
}
 

// metodo para insertar espacio
insertarConfiguracion(){
  // Start blocking
  this.blockUI.start('Insertando...'); 
  this._configuracionService.insertarConfiguracion(
                                        this.pin, 
                                        this.configuracion.Variable, 
                                        this.configuracion.Dato, 
                                        this.configuracion.SessionUser
                                      ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.Dato);
      this.listarConfiguraciones();
      this.blockUI.stop();
    },
    error => {
      this._globalFuncion.alertError("Error de conexión!");
      this.blockUI.stop();
    }
  )
}

// metodo para modificar espacio
modificarConfiguracion(){
  // Start blocking
  this.blockUI.start('Modificando...'); 
  this._configuracionService.modificarConfiguracion(
                                          this.pin, 
                                          this.configuracion.Variable, 
                                          this.configuracion.Dato, 
                                          this.configuracion.Active, 
                                          this.configuracion.SessionUser 
                                       ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.Dato);
      this.listarConfiguraciones();
      this.blockUI.stop();
    },
    error => {
      this.blockUI.stop();
      this._globalFuncion.alertError("Error de conexión!");
    }
  )    
}

// metodo para eliminar espacio    
eliminarConfiguracion(){
  // Start blocking
  this.blockUI.start('Eliminando...'); 
  this._configuracionService.eliminarConfiguracion(
                                        this.pin, 
                                        this.configuracion.Variable, 
                                        this.configuracion.SessionUser
                                      ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.Dato);
      this.listarConfiguraciones();
      this.blockUI.stop();
    },
    error => {
      this.blockUI.stop();
      this._globalFuncion.alertError("Error de conexión!");
    }
  )
}

//******************************************************************************* */
// EVENTOS DESDE EL FORMULARIO
//******************************************************************************* */

// evento al dar click al boton guardar espacio
insertarORmodificarConfiguracion(idModal,isValid:boolean){    
  if(isValid==true){
  $('#'+idModal).modal('hide'); 
 
    if(this.configuracion.Dato.length>=3){
    if(this.configuracion.Variable==''){   
      /*this.mensaje='insertar -> ' 
                            + 'DescripcionEspacio: '+ this.espacio.Descripcion;*/   
      this.insertarConfiguracion();        
    }else{
      /*this.mensaje='modificar -> ' 
                            + 'Id: '+ this.espacio.Id + ','
                            + 'Descripcion: '+ this.espacio.Descripcion;*/
      
      this.modificarConfiguracion();
    }
  }else{
      this.mensaje='Seleccione el tipo de problema.';
    }
     
}  
}

// evento de la lista para cargar o eliminar un espacio
cargarOReliminar(valor, opcion){                   
  this.configuracion=this.listaConfiguracion[valor];
 // this.mensaje='Preparado para modificar: ' + (valor+1);

  if(opcion){ 
     this.eliminarConfiguracion();
  }     
}  

// limpiamos los elementos
limpiar(){
  this.configuracion= {
    Variable:'',
    Dato:'',
    Active:'',
    SessionUser:''
  };
  this.mensaje='';
}
 
//lista datatables
}
