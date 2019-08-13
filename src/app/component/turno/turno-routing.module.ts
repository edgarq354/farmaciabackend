import { Routes, RouterModule } from '@angular/router';
import { TurnoComponent  } from './turno.component';

export const TurnoRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: TurnoComponent 
      }
    ]
  }
];
