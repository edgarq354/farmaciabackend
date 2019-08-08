import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil.component';

export const PerfilRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: PerfilComponent
      }
    ]
  }
];
