import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioComponent } from './servicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServicioRoutingModule } from './servicio-routing.module';
//libreria de cargando.....
import { BlockUIModule } from 'ng-block-ui';
 

@NgModule({
  declarations: [ServicioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ServicioRoutingModule),
    FormsModule,
    BlockUIModule.forRoot()
  ]
})
export class ServicioModule { }
