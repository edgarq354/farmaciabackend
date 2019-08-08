import { Routes, RouterModule } from '@angular/router';
import {ReporteMensualComponent } from './reporte-mensual.component';

export const ReporteMensualRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: ReporteMensualComponent
      }
    ]
  }
];
