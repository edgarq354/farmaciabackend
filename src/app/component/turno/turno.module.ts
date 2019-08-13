import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoComponent } from './turno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TurnoRoutingModule  } from './turno-routing.module';
//libreria de cargando.....
import { BlockUIModule } from 'ng-block-ui';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';


@NgModule({
  declarations: [TurnoComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(TurnoRoutingModule),
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot(),
    JwBootstrapSwitchNg2Module
  ]
})
export class TurnoModule { }
