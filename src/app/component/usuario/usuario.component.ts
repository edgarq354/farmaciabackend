import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// funciones globales
import { GLOBAL,DataTables } from '../../servicios/global';
import { globalFunciones } from '../../servicios/globalFunciones';
// llamo a los servicios
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioModel } from '../../models/usuario.model';

// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $:any;
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html' ,
  providers:[UsuarioService,globalFunciones]
})
export class UsuarioComponent   {
  public usuario: UsuarioModel;
  public listaUsuarios :UsuarioModel[]; 
  public pin:string;
  public IdUsuarioLogin:string;
  @BlockUI() blockUI: NgBlockUI;
  public swVer:boolean=false;
  


  constructor(  private _router: Router,
    private _usuarioService: UsuarioService,
    private _globalFuncion:globalFunciones) { 

      if( sessionStorage.getItem("datosUser")==null){
        _router.navigate(['/' ]);
    } else{
      this.IdUsuarioLogin=GLOBAL.session.Id;
      this.pin= GLOBAL.pin;
     
      this.usuario={
        id:null,
        Nombre: '',
        Usuario: '',
        IdTbTipoUsuario: '',
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
      this.listaUsuarios=[];

      this.consumirListarUsuarios();
    }

    }

  ngOnInit() {
  }

cargar(valor){                   
  // evento de la lista para cargar o eliminar un Usuario
  this.usuario=this.listaUsuarios[valor];
}  

S4() {  
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
}  

nuevo()
{
this.usuario.id=(this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toUpperCase();
this.usuario.IdTbUsuarioNodo="148";
this.usuario.IdTbNodo=this.usuario.id;
}

limpiar(){
  this.usuario={
    id:null,
    Nombre: '',
    Usuario: '',
    IdTbTipoUsuario: '',
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
}

 insertarOModificarUsuario(idModal,isValid:boolean){
 
 }

 consumirListarUsuarios()
 {

    // Start blocking
    this.blockUI.start('Cargando...'); 

    
  let jsonData={"opcion":"Lista"};
  this._usuarioService.listarUsuario(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {        
      }else{
        //console.log(result.Dato);
        
        this.listaUsuarios=result.Dato; 
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

}
