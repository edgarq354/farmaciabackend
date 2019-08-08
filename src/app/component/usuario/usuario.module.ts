import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioRoutingModule  } from './usuario-routing.module';
//libreria de cargando.....
import { BlockUIModule } from 'ng-block-ui';


@NgModule({
  declarations: [UsuarioComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(UsuarioRoutingModule),
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot()
  ]
})
export class UsuarioModule { }
