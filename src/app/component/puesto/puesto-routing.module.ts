import { Routes, RouterModule } from '@angular/router';
import {PuestoComponent } from './puesto.component';

export const PuestoRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: PuestoComponent
      }
    ]
  }
];
