import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// funciones globales
import { GLOBAL,DataTables } from '../../servicios/global';
import { globalFunciones } from '../../servicios/globalFunciones';
// llamo a los servicios
import { EquipoService } from '../../servicios/equipo.service';
import {  EquipoModel } from '../../models/equipo.model';

import { Usuario2 } from '../../models/usuario.model';

//Llama al servicio de Usuarios.
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioModel } from '../../models/usuario.model';

//Llama al servicio de Usuarios.
import { PuestoService } from '../../servicios/puesto.service';
import { PuestoModel } from '../../models/puesto.model';
 
// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { EquipoModule } from './equipo.module';

//codigo de encriptacion 
import * as CryptoJS from 'crypto-js';
 

import * as moment_ from 'moment';
export const moment =  moment_["default"];

declare var $:any;
declare function getIp():any; 

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  providers: [EquipoService, globalFunciones,UsuarioService,PuestoService],
})
export class EquipoComponent  {
  // Decorator wires up blockUI instance
  @BlockUI() blockUI: NgBlockUI;

  public titulo: string;
  public name: string;
  public mensaje : string;
  public pin: string;   
  public anio: string;   
  public session: Usuario2;  
  public NombrePuesto:string;
  public texto:string;
  public nuevo:boolean;
  public actualizar:boolean;
  public pc:boolean;

  public equipo: EquipoModel;
  public equipoNuevo:EquipoModel;
  public equipos : EquipoModel[]; 
  public equipoListaNuevo : EquipoModel[]; 

  public usuario: UsuarioModel;
  public usuarioLista: UsuarioModel[];

  public puesto: PuestoModel;
  public puestoLista:PuestoModel[];

  public IdTbPuesto:string;
  public swVer:boolean=false;

  public indexNuevalista:number=0;



  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _globalFuncion:globalFunciones,
    private _equipoService: EquipoService,
    private _usuarioService:UsuarioService,
    private _puestoService:PuestoService
    ) {
      if( sessionStorage.getItem("datosUser")==null){
        _router.navigate(['/' ]);
    } else{
      GLOBAL.session=JSON.parse(this.decryptData(sessionStorage.getItem("datosUser"),"encryptDatosuser"));
      this.titulo = '';        
      this.pin= GLOBAL.pin;
      this.session=GLOBAL.session;


      let fecha =Date();
      const dateAnio= moment(fecha).format('YYYY');

      this.titulo = 'Agregar un nuevo Equipo';  
      this.NombrePuesto='';
      this.pin= GLOBAL.pin;
      this.nuevo=true;
      this.actualizar=true;
      this.pc=true;
      this.IdTbPuesto='';
      this.anio=dateAnio;
      this.indexNuevalista=0;

      this.equipo= {
        Id:null,
        Tipo:'',
        Color:'',
        Marca:'',
        Modelo:'',
        CodigoAlcaldia :'',
        NroSerie :'',
        SistemaOperativo :'',
        NroIp :'',
        Red :'',
        NombreUsuario:null,
        NombrePuesto:null,
        IdTbUsuario:null,
        IdTbPuesto:null
     };
     this.equipoNuevo= {
      Id:null,
      Tipo:'',
      Color:'',
      Marca:'',
      Modelo:'',
      CodigoAlcaldia :'',
      NroSerie :'',
      SistemaOperativo :'',
      NroIp :'',
      Red :'',
      NombreUsuario:null,
      NombrePuesto:null,
      IdTbUsuario:null,
      IdTbPuesto:null
   };
      this.usuario={
        id:'',
        Nombre:'',
        Usuario:'',
        IdTbTipoUsuario:'',
        IdTbNodo:'',
        IdTbUsuarioNodo:'',
        IdTbAplicacion:'',
        IdCUarzo:'',
        Nro:'',
        TipoUsuario:'',
        Permisos:'',
        Cargo:'',
        IpMaquina:''
      }; 
      this.equipos=[];  
      this.equipoListaNuevo=[];  
      this.mensaje=""; 
     this.swVer=false;
    }
 
  }

  ngOnInit() {
     
    if(this.usuario.id==''||this.usuario.id ==null){
      this.listarEquipos();
    }else{
      this.listarEquiposPorIdUsuario();
    }
 
   this.listarUsuario();
   this.listarPuesto();
   getIp(); 
  }

  listarEquiposReinicio()
  {
    if(this.usuario.id==''||this.usuario.id ==null){
      this.listarEquipos();
    }else{
      this.listarEquiposPorIdUsuario();
    }
  }

  botonNuevo(value)
  {
    this.nuevo=value;
    this.pc=true;
    this.titulo='Agregar un nuevo Equipo';  
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 100);
  }

  botonActualizar(value)
  {
    this.actualizar=value;
    this.titulo='Agregar un nuevo Equipo';  
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 100);
  }

  esPc(){
    if(this.equipo.Tipo.trim()=='CPU'||this.equipo.Tipo.trim()=='PORTATIL')
    {
      this.pc=false;
    }
    else{
      this.pc=true;
    }
  }

getTipoEquipo(valor)
{
  $('[rel="tooltip"]').tooltip();
  let sw=true;
  if(valor=='CPU'||valor=='PORTATIL')
  {
    sw=false;
  }
  return sw;
}
verificarDatos()
{
  return false;
}

  ngAfterViewInit(){
    // Init Tooltips
    $('[rel="tooltip"]').tooltip();
}

// metodo para cargar la lista de Usuarios
listarPuesto(){
  let jsonData={
    "consulta":"Todo"
};

  this._puestoService.listarPuesto(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
       // console.log(result.Dato);
        
        this.puestoLista=result.Dato;                    
      }       
      this.limpiarPuesto();
    },
    error => {
      this._globalFuncion.alertError(error);
    }
  )
}

// metodo para cargar la lista de Usuarios
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
        
        this.usuarioLista=result.Dato;  
        
        
        setTimeout(() => {
          this.updated(); 
        }, 500);                 
      }       
      this.limpiarUsuario();
    },
    error => {
      this._globalFuncion.alertError(error);
    }
  )
}


// metodo para cargar la lista de Equipos
listarEquipos(){
    // Start blocking
  this.blockUI.start('Cargando...'); 

  let jsonData={"consulta":"Todo"};
  this._equipoService.listarEquipo(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
      // console.log(result.Dato);
        
        this.equipos=result.Dato; 
        if(this.swVer==true){
          $('#datatables').dataTable().fnDestroy();
        }else{
          this.swVer=true;
        }

        setTimeout(function(){
          $('#datatables').dataTable(DataTables);
        $('[rel="tooltip"]').tooltip();
        $('.selectpicker').selectpicker('refresh');
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

// metodo para cargar la lista de Equipos por Id Usuario
listarEquiposPorIdUsuario(){
  // Start blocking
this.blockUI.start('Cargando...'); 

let jsonData={
  "consulta":"UsuarioPuestoEquipo",
  "IdTbUsuario":this.usuario.id
};
this._equipoService.listarEquipo(this.pin,jsonData).subscribe(            
  result => {        
    if (result.Exito != 1) {
      this.mensaje = result.Dato;          
    }else{
    // console.log(result.Dato);
      
      this.equipos=result.Dato; 
      if(this.swVer==true){
        $('#datatables').dataTable().fnDestroy();
      }else{
        this.swVer=true;
      }

      setTimeout(function(){
        $('#datatables').dataTable(DataTables);
      $('[rel="tooltip"]').tooltip();
    },100);
    }
    this.blockUI.stop(); 
  },
  error => {
    this.blockUI.stop(); 
    this._globalFuncion.alertError("Error de conexión!");
  }
)
}


// metodo para cargar la lista de Equipos por Id Usuario y Año de registro
listarEquiposPorIdUsuarioAnio(){
  // Start blocking
this.blockUI.start('Cargando...'); 

let jsonData={
  "consulta":"UsuarioPuestoEquipo",
  "IdTbUsuario":this.usuario.id,
  "Anio":this.anio
};
this._equipoService.listarEquipo(this.pin,jsonData).subscribe(            
  result => {        
    if (result.Exito != 1) {
      this.mensaje = result.Dato;          
    }else{
    // console.log(result.Dato);
      
      this.equipos=result.Dato; 
      if(this.swVer==true){
        $('#datatables').dataTable().fnDestroy();
      }else{
        this.swVer=true;
      }

      setTimeout(function(){
        $('#datatables').dataTable(DataTables);
      $('[rel="tooltip"]').tooltip();
    },100);
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
insertarListaEquipoServicio(){
  // Start blocking
  this.blockUI.start('Insertando...'); 
  let opcion='asignado'
  this.puesto.Id=this.IdTbPuesto;
  if(this.IdTbPuesto=='-1')
  {
    opcion='nuevo';
    this.puesto.Nombre=this.NombrePuesto;
    
  }else
  {
    opcion='asignado';
  }
  
  this._equipoService.insertarEquipo(
                                        this.pin, 
                                       {
                                         "opcion":opcion,
                                         "equipo":this.equipoListaNuevo,
                                         "puesto":this.puesto,
                                         "IdTbUsuario":this.usuario.id,
                                         "SessionUser":this.session.Id
                                       }
                                      ).subscribe(            
    result => {        
      this.limpiarListaEquipo();
      this._globalFuncion.alertExito(result.Dato);
      this.listarEquiposReinicio();
      this.blockUI.stop();
    },
    error => {
      this._globalFuncion.alertError("Error de conexión!");
      this.blockUI.stop();
    }
  )
}

// metodo para insertar espacio
insertarEquipo(){
  // Start blocking
  this.blockUI.start('Insertando...'); 
  let opcion='asignado'
  this.puesto.Id=this.IdTbPuesto;
  if(this.IdTbPuesto=='-1')
  {
    opcion='nuevo';
    this.puesto.Nombre=this.NombrePuesto;
    
  }else
  {
    opcion='asignado';
  }
  this.equipo.Tipo=this.equipo.Tipo.trim();
  
  this._equipoService.insertarEquipo(
                                        this.pin, 
                                       {
                                         "opcion":opcion,
                                         "equipo":this.equipo,
                                         "puesto":this.puesto,
                                         "IdTbUsuario":this.usuario.id,
                                         "SessionUser":this.session.Id
                                       }
                                      ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.Dato);
      this.listarEquiposReinicio();
      this.blockUI.stop();
    },
    error => {
      this._globalFuncion.alertError("Error de conexión!");
      this.blockUI.stop();
    }
  )
}

// metodo para modificar espacio
modificarEquipo(){
  // Start blocking
  this.blockUI.start('Modificando...'); 

  let opcion='asignado'
  this.puesto.Id=this.IdTbPuesto;

  if(this.puesto.Id=='-1')
  {
    opcion='nuevo';
    this.puesto.Nombre=this.NombrePuesto;
  }else
  {
    opcion='asignado';
  }
//  console.log("IdPuesto:"+this.puesto.Id);
 

  this._equipoService.modificarEquipo(
                                          this.pin, 
                                        {
                                            "opcion":opcion,
                                         "equipo":this.equipo,
                                         "puesto":this.puesto,
                                         "IdTbUsuario":this.usuario.id
                                        }
                                       ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.Dato);
      this.listarEquipos();
      this.blockUI.stop();
    },
    error => {
      this.blockUI.stop();
      this._globalFuncion.alertError("Error de conexión!");
    }
  )    
}

// metodo para eliminar espacio    
eliminarEquipo(){
  // Start blocking
  this.blockUI.start('Eliminando...'); 
  this._equipoService.eliminarEquipo(
                                        this.pin, 
                                        {
                                          "Id":this.equipo.Id
                                      }
                                      ).subscribe(            
    result => {        
      this._globalFuncion.alertExito(result.Dato);
      this.listarEquipos();
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
insertarListaEquipo(){    
  if(this.esIdUPuesto() && this.esIdUsuario() && this.equipoListaNuevo.length>0){
    this.botonActualizar(!this.actualizar); 
      this.insertarListaEquipoServicio();        
  } 
  else{
    this._globalFuncion.alertError("Necesita agregar un equipo.");
  }
}

// evento al dar click al boton guardar espacio
insertarORmodificarTipo(idModal,isValid:boolean){    
  if(isValid==true){
    this.nuevo=!this.nuevo;
  
  //$('#'+idModal).modal('hide'); 
    if(this.equipo.Id==null){   
      /*this.mensaje='insertar -> ' 
                            + 'DescripcionEspacio: '+ this.espacio.Descripcion;*/   
      this.insertarEquipo();        
    }else{
      /*this.mensaje='modificar -> ' 
                            + 'Id: '+ this.espacio.Id + ','
                            + 'Descripcion: '+ this.espacio.Descripcion;*/
      
      this.modificarEquipo();
    }
  }  
}

// evento de la lista para cargar o eliminar un espacio
cargarOReliminar(valor, opcion){ 
                      
  this.equipo=this.equipos[valor];
  this.usuario.id=this.equipos[valor].IdTbUsuario;
  this.IdTbPuesto=this.equipos[valor].IdTbPuesto;
  this.puesto.Id=this.equipos[valor].IdTbPuesto;
 
  setTimeout(() => {
    $('.selectpicker').selectpicker('refresh');
    this.titulo='Actualizar el Equipo';
     this.esPc();
  }, 100);
  
 // this.mensaje='Preparado para modificar: ' + (valor+1);

  if(opcion){ 
     this.eliminarEquipo();
  }     

}  

// limpiamos los elementos
limpiar(){
  this.equipo= {
     Id:null,
     Tipo:'',
     Color:'',
     Marca:'',
     Modelo:'',
     CodigoAlcaldia :'',
     NroSerie :'',
     SistemaOperativo :'',
     NroIp :'',
     Red :'',
     NombreUsuario:null,
     NombrePuesto:null,
     IdTbUsuario:null,
     IdTbPuesto:null
  };
  this.mensaje='';
}

limpiarListaEquipo(){
  this.equipoListaNuevo=[];
}

limpiarUsuario(){
  this.usuario={
    id:'',
    Nombre:'',
    Usuario:'',
    IdTbTipoUsuario:'',
    IdTbNodo:'',
    IdTbUsuarioNodo:'',
    IdTbAplicacion:'',
    IdCUarzo:'',
    Nro:'',
    TipoUsuario:'',
    Permisos:'',
    Cargo:'',
    IpMaquina:''
  };
 
  this.mensaje='';
}
limpiarPuesto(){
  this.puesto={
    length:null,
    Id:null,
    Nombre:'',
    Descripcion:'',
    opcion:''
 }  
 
 this.NombrePuesto='';
}
 
//obtener archivo


fileChanged(e) {
  this.uploadDocument(e.target.files[0]);
  }

fileChangedPorLista(index,e) {
   
    this.uploadDocumentPorLista(e.target.files[0],this.indexNuevalista);
}

insertarIndex(index)
{
 this.indexNuevalista=index;
}


uploadDocumentPorLista(file,index) {
      let fileReader = new FileReader();
    
      fileReader.onload = (e) => {
        
         let dato =fileReader.result.toString();
         this.texto=dato;
         var lineas = dato.split('\n');
         this.equipo.Marca=lineas[3].trim();
         this.equipo.Modelo=lineas[5].trim();
         this.equipo.NroSerie=lineas[7].trim();
         
         let ipTexto=lineas[9];
         let inicio=ipTexto.indexOf('{"');
         ipTexto=ipTexto.slice(inicio+2,inicio+17);
      //   console.log("ipTexto:"+ipTexto);
         this.equipo.NroIp=ipTexto;
        
         this.equipoListaNuevo[index].Marca=this.equipo.Marca;
         this.equipoListaNuevo[index].Modelo=this.equipo.Modelo;
         this.equipoListaNuevo[index].NroSerie=this.equipo.NroSerie;
         this.equipoListaNuevo[index].NroIp=this.equipo.NroIp;
      }
      fileReader.readAsText(file);
    }  

uploadDocument(file) {
  let fileReader = new FileReader();

  fileReader.onload = (e) => {
    
     let dato =fileReader.result.toString();
     this.texto=dato;
     var lineas = dato.split('\n');
     this.equipo.Marca=lineas[3].trim();
     this.equipo.Modelo=lineas[5].trim();
     this.equipo.NroSerie=lineas[7].trim();
     
     let ipTexto=lineas[9];
     let inicio=ipTexto.indexOf('{"');
     ipTexto=ipTexto.slice(inicio+2,inicio+17);
   //  console.log("ipTexto:"+ipTexto);
     this.equipo.NroIp=ipTexto;
/*
     let i=0;
     for(var linea of lineas) {
         console.log('[linea: '+i+']', linea);
         i++;
     } 



    let n_eternet=0;
    let c_total=dato.length;
    let n_wifi=0;
     let eternet;
     let wifi;
     console.log("Dato:"+dato);
     console.log("Dato LENGHT:"+dato.length);
     console.log("slice:"+dato.slice(0,80));
     console.log("slice:"+dato[2]);
     console.log("slice:"+dato[3]);
     console.log("indexOf:"+ dato.indexOf("Nombre de host:"));
     console.log("indexOf:"+ dato.indexOf("Nombre del sistema operativo:"));
     console.log("indexOf:"+ dato.indexOf("Versi"));
     console.log("indexOf:"+ dato.indexOf("Fabricante del sistema:"));
     console.log("indexOf:"+ dato.indexOf("Modelo el sistema:"));
     console.log("indexOf:"+ dato.indexOf("Tipo de sistema:"));
     console.log("indexOf:"+ dato.indexOf("Ethernet"));
     console.log("indexOf:"+ dato.indexOf("Wi-Fi"));
     console.log("indexOf:"+ dato.indexOf("Ethernet"));
    
let _host=dato.indexOf("Nombre de host:");
let _so=dato.indexOf("Nombre del sistema operativo:");
let _version=dato.indexOf("Versi");
let _fabricante=dato.indexOf("Fabricante del sistema:");
let _modelo=dato.indexOf("Modelo el sistema:");
let _tipo=dato.indexOf("Tipo de sistema:");
n_eternet=dato.indexOf("Ethernet");
n_wifi=dato.indexOf("Wi-Fi");


console.log("Host name:"+dato.slice(_host+15,_so).trim());
let NombreHost=dato.slice(_host+15,_so).trim();
console.log("SO:"+dato.slice(_so+30,_version).trim());
let SO=dato.slice(_so+30,_version).trim();
console.log("Fabricante:"+dato.slice(_fabricante+23,_modelo).trim());
let Fabricante=dato.slice(_fabricante+23,_modelo).trim();
console.log("Modelo el SO:"+dato.slice(_modelo+18,_tipo).trim());
let Modelo=dato.slice(_modelo+18,_tipo).trim();



this.equipo.Marca=NombreHost+" - "+Fabricante;
this.equipo.Modelo=Modelo;
this.equipo.SistemaOperativo=SO;
//Obtener IP Ethernet     
     console.log("e:"+n_eternet+"..w:"+n_wifi+" . T:"+(n_wifi-n_eternet))
     if(n_wifi==0)
     {
       n_wifi=c_total;
     }
     eternet=dato.slice(n_eternet,n_wifi);
     let inicioIpEthernet=eternet.indexOf("[01]:");
     eternet=eternet.slice(inicioIpEthernet+5,inicioIpEthernet+21)
     console.log("IP ethernet:"+eternet);
 //Obtener Ip Wifi
     wifi=dato.slice(n_wifi,n_wifi+462);
     let inicioIpWifi=wifi.indexOf("[01]:");
     wifi=wifi.slice(inicioIpWifi,inicioIpWifi+21);
     console.log("Ip Wifi:"+wifi);
//Agregando Ip al Module Equipo
     if(eternet.trim().length>0){
      this.equipo.Red='Ethernet';
      this.equipo.NroIp=eternet.trim();
     }else if(wifi.trim().length>0){
      this.equipo.Red='Wifi';
      this.equipo.NroIp=eternet.trim();
     }

*/
  }
  fileReader.readAsText(file);
}

updated() {
  $('.selectpicker').selectpicker('refresh');
}
swPuesto()
{
  let sw=true;
  if(this.IdTbPuesto=="-1" )
  {
   sw=false;
  }
  return sw;
}

agregarLista()
{
  let equipo3:EquipoModel;
  equipo3= {
    Id:null,
    Tipo:'MONITOR',
    Color:'',
    Marca:'',
    Modelo:'',
    CodigoAlcaldia :'',
    NroSerie :'',
    SistemaOperativo :'',
    NroIp :'',
    Red :'',
    NombreUsuario:null,
    NombrePuesto:null,
    IdTbUsuario:null,
    IdTbPuesto:null
 };
  this.equipoListaNuevo.push(equipo3);
}
eliminarLista(index)
{
  this.equipoListaNuevo.splice(index,1);
}
actualizarIdUsuarioPuesto(){
  this.puesto.Id=this.IdTbPuesto;
  for(let i=0;this.equipoListaNuevo.length;i++)
  {
    this.equipoListaNuevo[i].IdTbUsuario=this.usuario.id;
    
    this.equipoListaNuevo[i].IdTbPuesto=this.puesto.Id;

  }
}

 


esIdUsuario(){
  let sw=false;
    if(this.usuario.id!='')
    {
      sw=true;
    }
  return sw;
}

esIdUPuesto(){
  let sw=false;
 if(this.IdTbPuesto!='')
  {
    sw=true;
  }
return sw;
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

}
