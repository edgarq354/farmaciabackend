import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteMensualComponent } from './reporte-mensual.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReporteMensualRoutingModule } from './reporte-mensual-routing.module';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [ReporteMensualComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ReporteMensualRoutingModule),
    FormsModule,
    BlockUIModule.forRoot()
  ]
})
export class ReporteMensualModule { }
