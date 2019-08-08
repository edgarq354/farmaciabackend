import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoproblemaComponent } from './tipoproblema.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TipoProblemaRoutingModule  } from './tipoproblema-routing.module';
//libreria de cargando.....
import { BlockUIModule } from 'ng-block-ui';


@NgModule({
  declarations: [TipoproblemaComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(TipoProblemaRoutingModule),
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot()
  ]
})
export class TipoProblemaModule { }
