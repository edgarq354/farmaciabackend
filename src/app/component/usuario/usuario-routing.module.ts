import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent  } from './usuario.component';

export const UsuarioRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: UsuarioComponent 
      }
    ]
  }
];
