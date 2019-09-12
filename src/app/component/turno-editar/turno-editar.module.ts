import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoEditarComponent } from './turno-editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TurnoEditarRoutingModule  } from './turno-editar-routing.module';
//libreria de cargando.....
import { BlockUIModule } from 'ng-block-ui';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';



@NgModule({
  declarations: [TurnoEditarComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(TurnoEditarRoutingModule),
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot(),
    JwBootstrapSwitchNg2Module
  ]
})
export class TurnoEditarModule { }
