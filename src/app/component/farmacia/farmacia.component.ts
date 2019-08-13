import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// funciones globales
import { GLOBAL,DataTables } from '../../servicios/global';
import { globalFunciones } from '../../servicios/globalFunciones';
// llamo a los servicios
import { FarmaciaService } from '../../servicios/farmacia.service';
import {  FarmaciaInterface } from '../../models/farmacia.model';
  
// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';
 
declare var $:any;

@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  providers: [
    FarmaciaService,
    globalFunciones]
})
export class FarmaciaComponent  {
  // Decorator wires up blockUI instance
  @BlockUI() blockUI: NgBlockUI;

  public titulo: string;
  public url: string;
  public name: string;
  public mensaje : string;
  public pin: string;

  public farmacia: FarmaciaInterface;
  public farmaciaLista : FarmaciaInterface[]; 
 
  public swVer:boolean=false;

  //Lista de Tipo de Probleam en configuracion


  constructor(private _route: ActivatedRoute,
    private _router: Router, 
    private _globalFuncion:globalFunciones,
    private _farmaciaService: FarmaciaService 
    ) {
      if( sessionStorage.getItem("datosUser")==null){
        _router.navigate(['/' ]);
    } else{
      this.url=GLOBAL.url;
      this.titulo = 'Farmacia';        
      this.pin= GLOBAL.pin;
      this.farmacia={
        id:'',
        nombre:'',
        direccion_logo:'',
        direccion_banner:'',
        razon_social:'',
        nit:'',
        correo:'',
        telefono:'',
        direccion:'',
        fecha_registro:'',
        calificacion:'',
        ranking:'',
        id_tbcomentario:'',
        latitud:'',
        longitud:'',
        indicacion:'',
        abierto_cerrado:'',
        turno:''
      };
      this.farmaciaLista=[];  
      this.mensaje=""; 
     this.swVer=false;
    }
 
  }

  ngOnInit() {
   this.listarFarmacia();
  }

verificarDatos()
{
  return false;
}
 

ngAfterViewInit(){
    // Init Tooltips
    $('[rel="tooltip"]').tooltip();
}

abrirFarmacia(index)
  {
    this.farmacia=this.farmaciaLista[index];
    this._router.navigate(['/farmacia-perfil',this.farmacia.id] );
  }
// metodo para cargar la lista de Tipos
listarFarmacia(){
    // Start blocking
  this.blockUI.start('Cargando...'); 

  let jsonData={
    id_usuario:"",
    texto:"",
    latitud:0,
    longitud:0
   };
  this._farmaciaService.listarFarmacia(this.pin,jsonData).subscribe(            
    result => {    
     // console.log(JSON.stringify(result));    
      if (result.suceso != 1) {
        this.mensaje = result.mensaje;          
      }else{
         
        this.farmaciaLista=result.lista;
        //this.actualizarActivo();
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
insertarFarmacia(){
  // Start blocking
  this.blockUI.start('Insertando...'); 
  this._farmaciaService.insertarFarmacia(
                                        this.pin, 
                                        this.farmacia, 
                                        ''
                                      ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.mensaje);
      this.listarFarmacia();
      this.blockUI.stop();
    },
    error => {
      this._globalFuncion.alertError("Error de conexión!");
      this.blockUI.stop();
    }
  )
}

 
// metodo para eliminar espacio    
eliminarFarmacia(){
  // Start blocking
  this.blockUI.start('Eliminando...'); 
  this._farmaciaService.eliminarFarmacia(
                                        this.pin, 
                                        this.farmacia.id, 
                                        ""
                                      ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.Dato);
      this.listarFarmacia();
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
insertarORmodificarFarmacia(idModal,isValid:boolean){    
  if(isValid==true){
  $('#'+idModal).modal('hide'); 
  if(this.farmacia.nombre.length>=3){
    if(this.farmacia.id==null){   
      /*this.mensaje='insertar -> ' 
                            + 'DescripcionEspacio: '+ this.espacio.Descripcion;*/   
      this.insertarFarmacia();        
    } 
  }else{
    this.mensaje='Al menos debe haber 3 caracteres.';
  }    
} else
{
  console.log("no valido");
} 
}

// evento de la lista para cargar o eliminar un espacio
cargarOReliminar(valor, opcion){                   
  this.farmacia=this.farmaciaLista[valor];
 // this.mensaje='Preparado para modificar: ' + (valor+1);

  if(opcion){ 
     this.eliminarFarmacia();
  }     
}  

// limpiamos los elementos
limpiar(){
  this.farmacia= {
    id:'',
    nombre:'',
    direccion_logo:'',
    direccion_banner:'',
    razon_social:'',
    nit:'',
    correo:'',
    telefono:'',
    direccion:'',
    fecha_registro:'',
    calificacion:'',
    ranking:'',
    id_tbcomentario:'',
    latitud:'',
    longitud:'',
    indicacion:'',
    abierto_cerrado:'',
    turno:''
  };
  this.mensaje='';
}


actualizarActivo()
{
  for(let i=0;i<this.farmaciaLista.length;i++)
  {
    let sw:boolean=false;
    if(this.farmaciaLista[i].activo==true)
    {
      sw=true;
    } 
    this.farmaciaLista[i].activo=sw;
  }
}
 
//lista datatables
}
