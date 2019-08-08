import { Routes, RouterModule } from '@angular/router';
import {ReporteComponent } from './reporte.component';

export const ReporteRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: ReporteComponent
      }
    ]
  }
];
