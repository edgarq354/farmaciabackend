import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Funciones Globales..
import { DataTablesExcel,GLOBAL } from '../../servicios/global';
import { globalFunciones }from '../../servicios/globalFunciones';

// llamo a los servicios
import { ServicioService } from '../../servicios/servicio.service';
import { InterfaceServicioMensualModel } from '../../models/servicio.model';

// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';


import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

//codigo de encriptacion 
import * as CryptoJS from 'crypto-js';
 
// llamo a los servicios de Usuario
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Usuario2 } from '../../models/usuario.model'; 

import * as moment_ from 'moment';
import { AccionModel } from '../../models/accion.model';
import { isNull } from 'util';
export const moment =  moment_["default"];
 

declare var $:any;

@Component({
  selector: 'app-reporte-mensual',
  templateUrl: './reporte-mensual.component.html',
  providers: [ServicioService, UsuarioService,globalFunciones] 
})
export class ReporteMensualComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public titulo: string;
  public anio: string;
  public mes: string;
  public mensaje: string;
  public pin: string;
  public session: Usuario2;
  public Opcion: string;

  public servicio: InterfaceServicioMensualModel;
  public servicios : InterfaceServicioMensualModel[];

  
  // variable para usuarios operadores
  public usuarios: Usuario[]; 

  //variable para usuarios funcionarios
  public usuario_funcionarios: Usuario[];

  public swVer:boolean=false;

  constructor(
    private _router: Router,
    private _servicioService: ServicioService,    
    private _usuarioService: UsuarioService,
    private _globalFuncion:globalFunciones
  ) { 

        //GLOBAL.session=sjcl.decrypt("encryptDatosUser", JSON.parse(sessionStorage.getItem("datosUser")));
         if(  sessionStorage.getItem("datosUser")==null){
          _router.navigate(['/']);
      } else{
     
      GLOBAL.session=JSON.parse(this.decryptData(sessionStorage.getItem("datosUser"),"encryptDatosuser"));
    this.titulo = 'Reporte';        
    this.pin= GLOBAL.pin;
    this.session=GLOBAL.session;

    //adicionamos los valores de a sessionStorage de inicio de sesion en las variables locales
 
 
    this.servicio= {
      IdTbTipoProblema: '',
      Nombre: '',
      Tipo: '',
      junior: '',
      alex: '',
      elder: ''
    };
    
    this.servicios=[];  

    let fecha=new Date();
  
    this.anio=moment(fecha).format('YYYY');
    this.mes=moment(fecha).format('MM');
    this.swVer=false;
    
    moment.locale('es');
  } 
  }

  ngOnInit() {
 
  }

 
  generarPDF(){
  }

      // metodo para cargar la lista de Servicios sin atender
listarServicios(){

 
  this.blockUI.start('Cargando...');

  //console.log(this.FechaInicio);
  //console.log(this.FechaFin);
 
  let jsonData={
    "opcion":"ReporteMensual",
    "anio":this.anio,
    "mes":this.mes
  };

  //console.log("IdOperador:"+$("#IdOperador option:selected").text());
  //console.log("IdFuncionario:"+$("#IdFuncionario option:selected").text());

  console.log("Json:"+JSON.stringify(jsonData));
  this._servicioService.listarServicio(this.pin,jsonData).subscribe(            
    result => {  
      
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        console.log(result.Dato);
        this.servicios=result.Dato; 
                               
      }
      if(this.swVer==true){
        $('#datatables').dataTable().fnDestroy();
      }  else{
      this.swVer=true;
      }
     
      setTimeout(function(){
        
        $('#datatables').dataTable(DataTablesExcel);
        $('[rel="tooltip"]').tooltip();
      },500); 
      this.blockUI.stop(); 
    },
    error => {
      this.blockUI.stop();
      this._globalFuncion.alertError(error);
      
    }
  )
}




//metodo para obtener lista de Usuario Funcionario
listarUsuario(){
  let jsonData={
    "opcion":"Tipo",
  "tipo_usuario":"FUNCIONARIO"
};
this.blockUI.start('Cargando...');
  this._usuarioService.listarUsuario(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        //console.log(result.Dato);
        
        this.usuario_funcionarios=result.Dato;           
        
      }  
      this.blockUI.stop();     
    },
    error => {
      this._globalFuncion.alertError(error);
      this.blockUI.stop();
    }
  )
}


//metodo para obtener lista de Operadores
 
ngAfterViewInit(){

  
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


Copiar(contenido)
{
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(contenido).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    this._globalFuncion.alertExito("Se ha copiado correctamente");
} 

 
}
