import { Routes, RouterModule } from '@angular/router';
import { TurnoEditarComponent  } from './turno-editar.component';


export const TurnoEditarRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: TurnoEditarComponent 
      }
    ]
  }
];
