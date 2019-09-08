import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FarmaciaTurnoComponent } from './farmacia-turno.component';
import { FarmaciaTurnoRoutingModule  } from './farmacia-turno-routing.module';
//libreria de cargando.....
import { BlockUIModule } from 'ng-block-ui';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';


@NgModule({
  declarations: [FarmaciaTurnoComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(FarmaciaTurnoRoutingModule),
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot(),
    JwBootstrapSwitchNg2Module
  ]
})
export class FarmaciaTurnoModule { }
