import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipoComponent } from './equipo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EquipoRoutingModule } from './equipo-routing.module';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [EquipoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(EquipoRoutingModule),
    FormsModule,
    BlockUIModule.forRoot()
  ]
})
export class EquipoModule { }
