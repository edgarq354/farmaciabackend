import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmaciaPerfilComponent } from './farmacia-perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FarmaciaPerfilRoutingModule  } from './farmacia-perfil-routing.module';
//libreria de cargando.....
import { BlockUIModule } from 'ng-block-ui';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';



@NgModule({
  declarations: [FarmaciaPerfilComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(FarmaciaPerfilRoutingModule),
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot(),
    JwBootstrapSwitchNg2Module
  ]
})
export class FarmaciaPerfilModule { }
