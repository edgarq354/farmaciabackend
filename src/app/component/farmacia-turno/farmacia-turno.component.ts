import { Component, OnInit } from '@angular/core';
// Import BlockUI decorator & optional NgBlockUI type 
import { Router,ActivatedRoute } from '@angular/router';

// funciones globales
import { GLOBAL,DataTables } from '../../servicios/global';
import { globalFunciones } from '../../servicios/globalFunciones';
// llamo a los servicios
import { FarmaciaService } from '../../servicios/farmacia.service';
import {  FarmaciaInterface,FarmaciaTurnoInterface } from '../../models/farmacia.model';
import {  HorarioInterface,Horario } from '../../models/horario.model';
// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FarmaciaComponent } from '../farmacia/farmacia.component';
 

 
declare var $:any;

import * as moment_ from 'moment';
export const moment =  moment_["default"];


@Component({
  selector: 'app-farmacia-turno',
  templateUrl: './farmacia-turno.component.html',
  styleUrls: ['./farmacia-turno.component.css'],
  providers: [
    FarmaciaService,
    globalFunciones]
})
export class FarmaciaTurnoComponent implements OnInit {
   // Decorator wires up blockUI instance
  @BlockUI() blockUI: NgBlockUI;

  public titulo: string;
  public url: string;
  public name: string;
  public mensaje : string;
  public pin: string;
  public fechaInicio: string;
  public fechaFin: string;

  public farmacia: FarmaciaInterface;
  public farmaciaLista : FarmaciaInterface[]; 
  public farmaciaTurno: FarmaciaTurnoInterface;
  public farmaciaTurnoLista : FarmaciaTurnoInterface[];
  public farmaciaTurnoNuevoLista : FarmaciaTurnoInterface[];
 
  public swVer:boolean=false;

  public mesLista: string[];
  public anio: string;  
  public mes: string;  
  

  constructor(private _route: ActivatedRoute,
    private _router: Router, 
    private _globalFuncion:globalFunciones,
    private _farmaciaService: FarmaciaService ) {
 
      

    let fecha =Date();
    const dateAnio= moment(fecha).format('YYYY');
    const dateMes= moment(fecha).format('MM');

      let fecha_2= new Date();
      fecha_2.setDate(fecha_2.getDate() +7);
      const dateStringFin = moment(fecha_2).format('YYYY-MM-DD');
      const dateStringInicio = moment(fecha).format('YYYY-MM-DD');
      this.fechaInicio=dateStringInicio;
      this.fechaFin=dateStringFin;

    //this.mesLista==["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];  
    this.mes=dateMes;
    this.anio=dateAnio;

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
    this.farmaciaTurno={
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
    this.farmaciaLista=[];  
    this.farmaciaTurnoLista=[];  
    this.farmaciaTurnoNuevoLista=[];  
    this.mensaje=""; 
   this.swVer=false;
  }

  moment.locale('es');
}

  ngOnInit() {
     
    this.listarFarmaciaTurno();
  }

  // metodo para cargar la lista de Tipos
  InsertarTurno(){
    // Start blocking
  this.blockUI.start('Cargando...'); 
  
  let jsonData={
    anio:this.anio, 
   };
  this._farmaciaService.insertarTurno(this.pin,jsonData,'').subscribe(            
    result => {    
      this.blockUI.stop(); 
      this.listarFarmaciaTurno();
    },
    error => {
      this.blockUI.stop(); 
    }
  )
  }
  
  // metodo para cargar la lista de Tipos
listarFarmaciaTurno(){
  // Start blocking
this.blockUI.start('Cargando...'); 

let jsonData={
  id_usuario:1,
  text:"",
	latitud:0,
	longitud:0,
  fecha_inicio: this.fechaInicio,
  fecha_fin: this.fechaFin 
 };
 //console.log(JSON.stringify(jsonData));  
this._farmaciaService.listarTurno(this.pin,jsonData).subscribe(            
  result => {    
  // console.log(JSON.stringify(result));    
    if (result.suceso != 1) {
      this.mensaje = result.mensaje;          
    }else{
       
      this.farmaciaTurnoLista=result.lista;
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

abrirTurno(index)
  {
    this._router.navigate(['/turno-editar',this.farmaciaTurnoLista[index].id] );
  }


  

}
