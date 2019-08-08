import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// funciones globales
import { GLOBAL,DataTables } from '../../servicios/global';
import { globalFunciones } from '../../servicios/globalFunciones';
// llamo a los servicios
import { FarmaciaService } from '../../servicios/tipoproblema.service';
import {  InterfaceTipoProblemaModel } from '../../models/tipoproblema.model';
 
//Llama al servicio de Usuarios.
import { ConfiguracionService } from '../../servicios/configuracion.service';
import { InterfaceConfiguracionModel } from '../../models/configuracion.model';

// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';

// llamo a las Acciones
import { AccionService } from '../../servicios/accion.service';
import { AccionModel } from '../../models/accion.model';

declare var $:any;

@Component({
  selector: 'app-tipoproblema',
  templateUrl: './tipoproblema.component.html',
  providers: [
    TipoProblemaService,
    AccionService,
    globalFunciones,
    ConfiguracionService],
})
export class TipoproblemaComponent  {
  // Decorator wires up blockUI instance
  @BlockUI() blockUI: NgBlockUI;

  public titulo: string;
  public name: string;
  public mensaje : string;
  public pin: string;

  public tipoproblema: InterfaceTipoProblemaModel;
  public tipoproblemas : InterfaceTipoProblemaModel[]; 
 
  public swVer:boolean=false;
  public listaAcciones : AccionModel[];

  //Lista de Tipo de Probleam en configuracion
  public listaConfiguracionTipoProblema : InterfaceConfiguracionModel[];


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _accionService: AccionService,
    private _globalFuncion:globalFunciones,
    private _tipoproblemaService: TipoProblemaService,
    private _configuracionService: ConfiguracionService
    ) {
      if( sessionStorage.getItem("datosUser")==null){
        _router.navigate(['/' ]);
    } else{

      this.titulo = 'Tipo de Problema';        
      this.pin= GLOBAL.pin;
      this.tipoproblema={
        id:null,
        Nombre:'',
        Tipo:''
      };
      this.tipoproblemas=[];  
      this.listaConfiguracionTipoProblema=[];
      this.mensaje=""; 
     this.swVer=false;
    }
 
  }

  ngOnInit() {
   this.listarTipos();
   this.listarConfiguracionTipoProblema();
  }

verificarDatos()
{
  return false;
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
        this._globalFuncion.alertError("Error de conexión!");
      }
    )
  }

  ngAfterViewInit(){
    // Init Tooltips
    $('[rel="tooltip"]').tooltip();
}
// metodo para cargar la lista de Tipos
listarTipos(){
    // Start blocking
  this.blockUI.start('Cargando...'); 

  let jsonData={"opcion":"Lista"};
  this._tipoproblemaService.listarTipo(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        //console.log(result.Dato);
        
        this.tipoproblemas=result.Dato; 
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

// metodo para insertar espacio
insertarTipo(){
  // Start blocking
  this.blockUI.start('Insertando...'); 
  this._tipoproblemaService.insertarTipo(
                                        this.pin, 
                                        this.tipoproblema.Nombre, 
                                        this.tipoproblema.Tipo, 
                                        ''
                                      ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.Dato);
      this.listarTipos();
      this.blockUI.stop();
    },
    error => {
      this._globalFuncion.alertError("Error de conexión!");
      this.blockUI.stop();
    }
  )
}

// metodo para modificar espacio
modificarTipo(){
  // Start blocking
  this.blockUI.start('Modificando...'); 
  this._tipoproblemaService.modificarTipo(
                                          this.pin, 
                                          this.tipoproblema.id, 
                                          this.tipoproblema.Nombre, 
                                          this.tipoproblema.Tipo, 
                                          '' 
                                       ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.Dato);
      this.listarTipos();
      this.blockUI.stop();
    },
    error => {
      this.blockUI.stop();
      this._globalFuncion.alertError("Error de conexión!");
    }
  )    
}

// metodo para eliminar espacio    
eliminarTipo(){
  // Start blocking
  this.blockUI.start('Eliminando...'); 
  this._tipoproblemaService.eliminarTipo(
                                        this.pin, 
                                        this.tipoproblema.id, 
                                        ""
                                      ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.Dato);
      this.listarTipos();
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
insertarORmodificarTipo(idModal,isValid:boolean){    
  if(isValid==true){
  $('#'+idModal).modal('hide'); 
  if(this.tipoproblema.Nombre.length>=3){
    if(this.tipoproblema.Tipo.length>=3){
    if(this.tipoproblema.id==null){   
      /*this.mensaje='insertar -> ' 
                            + 'DescripcionEspacio: '+ this.espacio.Descripcion;*/   
      this.insertarTipo();        
    }else{
      /*this.mensaje='modificar -> ' 
                            + 'Id: '+ this.espacio.Id + ','
                            + 'Descripcion: '+ this.espacio.Descripcion;*/
      
      this.modificarTipo();
    }
  }else{
      this.mensaje='Seleccione el tipo de problema.';
    }
  }else{
    this.mensaje='Al menos debe haber 3 caracteres.';
  }    
}  
}

// evento de la lista para cargar o eliminar un espacio
cargarOReliminar(valor, opcion){                   
  this.tipoproblema=this.tipoproblemas[valor];
 // this.mensaje='Preparado para modificar: ' + (valor+1);

  if(opcion){ 
     this.eliminarTipo();
  }     
}  

// limpiamos los elementos
limpiar(){
  this.tipoproblema= {
    id:null,
    Nombre:'',
    Tipo:''
  };
  this.mensaje='';
}
 
//lista datatables
}
