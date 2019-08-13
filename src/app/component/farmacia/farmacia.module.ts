import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmaciaComponent } from './farmacia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FarmaciaRoutingModule  } from './farmacia-routing.module';
//libreria de cargando.....
import { BlockUIModule } from 'ng-block-ui';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';


@NgModule({
  declarations: [FarmaciaComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(FarmaciaRoutingModule),
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot(),
    JwBootstrapSwitchNg2Module
  ]
})
export class FarmaciaModule { }
