import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteComponent } from './reporte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReporteRoutingModule } from './reporte-routing.module';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [ReporteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ReporteRoutingModule),
    FormsModule,
    BlockUIModule.forRoot()
  ]
})
export class ReporteModule { }
