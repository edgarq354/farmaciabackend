import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuestoComponent } from './puesto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PuestoRoutingModule } from './puesto-routing.module';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [PuestoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PuestoRoutingModule),
    FormsModule,
    BlockUIModule.forRoot()
  ]
})
export class PuestoModule { }
