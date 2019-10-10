import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../servicios/global';
// llamo a los servicios de Usuario
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario, UsuarioInterface } from '../../models/usuario.model';
//lodash
import * as _ from 'lodash'; 

//codigo de encriptacion
import * as CryptoJS from 'crypto-js';

declare var $:any; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UsuarioService]
})


export class LoginComponent implements OnInit {

test : Date = new Date();
  public mensaje:string;
  public Usuario:string;
  public Password:string;
  public pin:string;





  constructor(
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _usuarioService2: UsuarioService
  )
  {
    try{
      let sw:string=localStorage.getItem("cargando");
      if(sw==null)
      {
        localStorage.setItem("cargando",'false');
      }else
      {
        localStorage.setItem("cargando",'false');
      }

    }catch(e){
      localStorage.setItem("cargando",'false');
    }

    this.pin= GLOBAL.pin;
    this.Usuario="";
    this.Password="";


    let dato={"Nombre":"Edgar"};
    let encryptado=this.encryptData(dato,"prueba");
    let decryptado=this.decryptData(encryptado,"prueba");
//console.log("En"+encryptado);
//console.log("De"+JSON.stringify(decryptado));
    this.ngOnInit();
  }


  cargando()
  {
    return localStorage.getItem('cargando');
  }

 checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };
ngOnInit(){
        this.checkFullPageBackgroundImage();

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }



  IniciarSesion()
  {
    localStorage.setItem('cargando','true');
    let json={
      "usuario":this.Usuario,
      "contrasenia":this.Password 
    };

     console.log(JSON.stringify(json));
    this._usuarioService.iniciar_sesion(this.pin,json).subscribe(
      result => {
        localStorage.setItem('cargando','false');
         console.log(JSON.stringify(result));
          this.mensaje = result.mensaje;
        

          if(result.suceso==1){
            let us:UsuarioInterface;
            us=result.perfil;
            us.farmacia=result.farmacia;
            //console.log(JSON.stringify(us));
            this.guardar_local(us);
            //console.log(result.Dato);
            this._router.navigate(['/home']);
          }else{
            this.mensaje_error( this.mensaje);
          }
        

      },
      error => {
        localStorage.setItem('cargando','false');
        this.mensaje_error('error de conexión: ' + <any>error);
      }
    )
  }

 
  mensaje_error(mensaje)
  {
    $.notify({
      message: "<b>"+ mensaje+"</b>"

    },{
      type:'danger',
      timer: 4000,
      placement: {
        from: 'top',
        align: 'center'
      }
    });
  }

  guardar_local(Dato )
  {
    /*
    let enc=this.encryptData( JSON.stringify(Dato),"encryptDatosuser");

    let dec=this.decryptData( enc,"encryptDatosuser");
   //console.log("encrypt:"+enc+"  descrypt:"+JSON.stringify(JSON.parse(dec)));
   */
    sessionStorage.setItem("datosUser",  this.encryptData( JSON.stringify(Dato),"encryptDatosuser"));

    //console.log("Completo");
  }
  // limpiamos los elementos
  limpiar_Usuarios(){
    this.Usuario='';
    this.Password='';
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
