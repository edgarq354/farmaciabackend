import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

// funciones globales
import { GLOBAL,DataTables } from '../../servicios/global';
import { globalFunciones } from '../../servicios/globalFunciones';
// llamo a los servicios
import { FarmaciaService } from '../../servicios/farmacia.service';
import { FarmaciaInterface,FarmaciaTurnoInterface } from '../../models/farmacia.model'; 
// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $:any;
 

@Component({
  selector: 'app-turno-editar',
  templateUrl: './turno-editar.component.html',
  styleUrls: ['./turno-editar.component.css'],
  providers: [
    FarmaciaService,
    globalFunciones]
})
export class TurnoEditarComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  IdImport:any;
 
  public titulo: string;
  public url: string;
  public name: string;
  public mensaje : string;
  public pin: string;

  public farmaciaLista : FarmaciaInterface[]; 
  public turno : FarmaciaTurnoInterface; 


  public swVer:boolean=false;


 
  
  

  constructor(private activeRoute:ActivatedRoute, 
    private _router: Router, 
    private _globalFuncion:globalFunciones,
    private _farmaciaService: FarmaciaService) { 
      this.IdImport=this.activeRoute.snapshot.paramMap.get("id");
      this.url=GLOBAL.url;
      this.titulo="Actualizar la Farmacia";
  
      if( sessionStorage.getItem("datosUser")==null){
        _router.navigate(['/' ]);
    } else{
  
     
        this.mensaje=""; 
        this.swVer=false;
  
  
      }

      this.turno={
        id:'',
        nombre_dia:'',
        dia:0,
        id_tbfarmacia:0,
        hora_inicio:'',
        hora_fin:'',
        activo:false,
        cantidad:0,
        idtbfarmacia:0,
        idtbturno:0
      };

    }

  ngOnInit() {
    
    this.getTurno();
  }

  // metodo para cargar la lista de Tipos
listarFarmacia(){
  // Start blocking
this.blockUI.start('Cargando...'); 

let jsonData={
  id_usuario:"",
  texto:"",
  latitud:0,
  longitud:0,
  id_turno:this.IdImport
 };
this._farmaciaService.lista_farmacia_todo_turno_por_id(this.pin,jsonData).subscribe(            
  result => {    
   // console.log(JSON.stringify(result));    
    if (result.suceso != 1) {
      this.mensaje = result.mensaje;          
    }else{
       
      this.farmaciaLista=result.lista;
      this.actualizarSWTurnoFarmacia();
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


// metodo para cargar la lista de Tipos
getTurno(){
  // Start blocking
this.blockUI.start('Cargando...'); 

let jsonData={
  id_turno:this.IdImport
 };
this._farmaciaService.getTurnoPorId(this.pin,jsonData).subscribe(            
  result => {    
   // console.log(JSON.stringify(result));    
    if (result.suceso != 1) {
      this.mensaje = result.mensaje;          
    }else{
      this.turno=result.turno;
    }
    this.blockUI.stop(); 
    this.actualizarActivoTurno();
    this.listarFarmacia();
    
  },
  error => {
    this.blockUI.stop(); 
    this._globalFuncion.alertError("Error de conexión!");
  }
)
}

actualizarActivoTurno()
  {
     
      let sw:boolean=false;
      if(this.turno.activo==true)
      {
        sw=true;
      } 
      this.turno.activo=sw;
     
  }
 
actualizarSWTurnoFarmacia()
  {
    for(let i=0;i<this.farmaciaLista.length;i++)
    {
      let sw:boolean=false;
      if(this.farmaciaLista[i].sw_turno==true)
      {
        sw=true;
      } 
      this.farmaciaLista[i].sw_turno=sw;
    }
  }

}
