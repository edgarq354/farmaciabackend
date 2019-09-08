import { Routes, RouterModule } from '@angular/router';
import { FarmaciaTurnoComponent } from './farmacia-turno.component';

export const FarmaciaTurnoRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: FarmaciaTurnoComponent
      }
    ]
  }
];
