import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionComponent } from './configuracion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfiguracionRoutingModule  } from './configuracion-routing.module';
//libreria de cargando.....
import { BlockUIModule } from 'ng-block-ui';


@NgModule({
  declarations: [ConfiguracionComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(ConfiguracionRoutingModule),
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot()
  ]
})
export class ConfiguracionModule { }
