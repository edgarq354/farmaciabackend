import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../servicios/global';

 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html' ,
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {
  selectedFile: File
  constructor( private _usuarioService: UsuarioService) { 
    this.selectedFile=null;
  }

  ngOnInit() {
  }

  onFileChanged(event) {
   this.selectedFile = <File>event.target.files[0];
  }

  subiendoando(ev){
    let img:any = ev.target;
    if(img.files.length > 0){
      let form = new FormData();
      form.append('file',img.files[0]);
      this._usuarioService.subirImagen(form).subscribe(
        resp => {
          if(resp.status){
            alert("Gracias por visitar unprogramador.com");
          }
        },
        error => {
          alert('Imagen supera el tamaño permitido');
        }
      );

    }

  }

 

  
   
}
