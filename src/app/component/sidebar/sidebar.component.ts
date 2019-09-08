import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
// llamo a los servicios
import { GLOBAL } from '../../servicios/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServicioService } from '../../servicios/servicio.service';
import { InterfaceServicioModel } from '../../models/servicio.model';
import { UsuarioInterface } from '../../models/usuario.model';

//codigo de encriptacion 
import * as CryptoJS from 'crypto-js';

//lodash
import * as _ from 'lodash'; 

declare var $:any;
declare var swal:any;
//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  // icon: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/home',
    title: 'Inicio',
    type: 'link',
    icontype: 'fa fa-home'
  },
  {
    path: '/farmacia',
    title: 'Farmacia',
    type: 'link',
    icontype: 'fa fa-user-md'
  },
  {
    path: '/farmacia-turno',
    title: 'Farmacia Turno',
    type: 'link',
    icontype: 'fa fa-user-md'
  }  
];

@Component({
  selector: 'app-sidebar',
  providers: [ServicioService],
  templateUrl: './sidebar.component.html' 
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public Nombre_:string;
  public Usuario_:string;
  public Id_:number;
  public session:UsuarioInterface;

  public servicio_notificacion: InterfaceServicioModel;
  public servicios_notificacion : InterfaceServicioModel[];

  public intervalo;

  public audio;


  isNotMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  constructor(
    private _router: Router,
    private _servicioService: ServicioService) { 

      //GLOBAL.session=CryptoJS.AES.decrypt("encryptDatosUser", JSON.parse(sessionStorage.getItem("datosUser")));
      if( sessionStorage.getItem("datosUser")==null){
        _router.navigate(['/', 'login']);
    } else{
      GLOBAL.session=JSON.parse(this.decryptData(sessionStorage.getItem("datosUser"),"encryptDatosuser"));
      
      //console.log("dato:"+JSON.stringify(GLOBAL.session));

      this.session=GLOBAL.session; 
      this.Nombre_=this.session.nombre;
      this.Usuario_=this.session.usuario;
      this.Id_=this.session.id;
      this.audio = new Audio();
    this.audio.src = "../../../assets/audio/sirena2.ogg";
    this.audio.load();
    }

 
    
    }

    
  playAudio(){
    this.audio.play();
    }

  ngOnInit() {
    var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
    this.menuItems = ROUTES.filter(menuItem => menuItem);

   /*
      this.menuItems.push({
        path: '/servicio',
        title: 'Servicio',
        type: 'link',
        icontype: 'fa fa-user-md'
      });
 */

    isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function
      $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
      $('html').addClass('perfect-scrollbar-on');
    } else {
      $('html').addClass('perfect-scrollbar-off');
    }
    
  }

  
 

  hayNuevoServicioSinAceptar()
  {
    // metodo para cargar la lista de Servicios sin atender
    if( sessionStorage.getItem("datosUser")!=null){
      let se= JSON.parse(this.decryptData(sessionStorage.getItem("datosUser"),"encryptDatosuser"));
      let jsonData={
        "opcion":"Lista", 
        "estado":"UltimosMinutos", 
        "tipousuario":se.TipoUsuario,
        "IdTbUsuarioOperador":se.Id
      };

      //console.log(JSON.stringify(jsonData));
    
      this._servicioService.listarServicio("",jsonData).subscribe(            
        result => {        
          if (result.Exito != 1) {
                      
          }else{
            ////console.log(result.Dato);
            this.servicios_notificacion=result.Dato;    
            for (let k = 0; k < this.servicios_notificacion.length; k++) {  
                  this.showNotification('top','left',this.servicios_notificacion[k].Funcionario,this.servicios_notificacion[k].Detalle);    
          }
          if(this.servicios_notificacion.length>0)
          {
            this.playAudio();
          }
          } 
        },
        error => {
          swal("Error de conexión!",error, "warning");
        }
      )
    }else{
      clearInterval(this.intervalo);
    }
     
  };



showNotification(from, align,titulo,mensaje){
    var type = ['','info','success','warning','danger'];
    var color = 4;

  $.notify({
      message: "<a style='color:white;'   href='#/servicio'><b>"+titulo+"</b> - "+mensaje+"</a>"
    },{
        type: type[color],
        timer: 2000,
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
   // console.log(e);
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
   // console.log(e);
  }
}

  ngAfterViewInit() {
    var $sidebarParent = $('.sidebar .nav > li.active .collapse li.active > a').parent().parent().parent();
    var collapseId = $sidebarParent.siblings('a').attr("href");
    $(collapseId).collapse("show");
  }

  salir(){
    
    sessionStorage.clear();
    localStorage.clear();
   this._router.navigate(["/"]);
  }
 

}
