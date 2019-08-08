import { Routes, RouterModule } from '@angular/router';
import {EquipoComponent } from './equipo.component';

export const EquipoRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: EquipoComponent
      }
    ]
  }
];
