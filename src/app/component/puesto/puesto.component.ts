import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// funciones globales
import { GLOBAL,DataTables } from '../../servicios/global';
import { globalFunciones } from '../../servicios/globalFunciones';
// llamo a los servicios
import { PuestoService } from '../../servicios/puesto.service';
import {  PuestoModel } from '../../models/puesto.model';
 
// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $:any;

@Component({
  selector: 'app-puesto',
  templateUrl: './puesto.component.html',
  providers: [PuestoService, globalFunciones],
})
export class PuestoComponent  {
  // Decorator wires up blockUI instance
  @BlockUI() blockUI: NgBlockUI;

  public titulo: string;
  public name: string;
  public mensaje : string;
  public pin: string;  

  public puesto: PuestoModel;
  public puestos : PuestoModel[]; 
 
  public swVer:boolean=false;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _globalFuncion:globalFunciones,
    private _puestoService: PuestoService) {
      if( sessionStorage.getItem("datosUser")==null){
        _router.navigate(['/' ]);
    } else{

      this.titulo = 'Puesto';        
      this.pin= GLOBAL.pin;
      this.puesto={
        Id:null,
        Nombre:'',
        Descripcion:'' 
      };
      this.puestos=[];  
      this.mensaje=""; 
     this.swVer=false;
    }
 
  }

  ngOnInit() {
   this.listarPuestos();
  }

verificarDatos()
{
  return false;
}

  ngAfterViewInit(){
    // Init Tooltips
    $('[rel="tooltip"]').tooltip();
}
// metodo para cargar la lista de Tipos
listarPuestos(){
    // Start blocking
  this.blockUI.start('Cargando...'); 

  let jsonData={"consulta":"Todo"};
  this._puestoService.listarPuesto(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        //console.log(result.Dato);
        
        this.puestos=result.Dato; 
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
insertarPuesto(){
  // Start blocking
  this.blockUI.start('Insertando...'); 
  this.puesto.opcion="nuevo";
  this._puestoService.insertarPuesto(
                                        this.pin, 
                                       this.puesto
                                      ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.Dato);
      this.listarPuestos();
      this.blockUI.stop();
    },
    error => {
      this._globalFuncion.alertError("Error de conexión!");
      this.blockUI.stop();
    }
  )
}

// metodo para modificar espacio
modificarPuesto(){
  // Start blocking
  this.blockUI.start('Modificando...'); 
  this._puestoService.modificarPuesto(
                                          this.pin, 
                                          this.puesto
                                       ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.Dato);
      this.listarPuestos();
      this.blockUI.stop();
    },
    error => {
      this.blockUI.stop();
      this._globalFuncion.alertError("Error de conexión!");
    }
  )    
}

// metodo para eliminar espacio    
eliminarPuesto(){
  // Start blocking
  this.blockUI.start('Eliminando...'); 
  this._puestoService.eliminarPuesto(
                                        this.pin, 
                                        this.puesto
                                      ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.Dato);
      this.listarPuestos();
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
    if(this.puesto.Id==null){   
      /*this.mensaje='insertar -> ' 
                            + 'DescripcionEspacio: '+ this.espacio.Descripcion;*/   
      this.insertarPuesto();        
    }else{
      /*this.mensaje='modificar -> ' 
                            + 'Id: '+ this.espacio.Id + ','
                            + 'Descripcion: '+ this.espacio.Descripcion;*/
      
      this.modificarPuesto();
    }
  }  
}

// evento de la lista para cargar o eliminar un espacio
cargarOReliminar(valor, opcion){                   
  this.puesto=this.puestos[valor];
 // this.mensaje='Preparado para modificar: ' + (valor+1);

  if(opcion){ 
     this.eliminarPuesto();
  }     
}  

// limpiamos los elementos
limpiar(){
  this.puesto= {
    Id:null,
    Nombre:'' ,
    Descripcion:''
  };
  this.mensaje='';
}
 
//lista datatables
}
