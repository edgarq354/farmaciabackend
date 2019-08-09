import { Routes, RouterModule } from '@angular/router';
import { FarmaciaPerfilComponent  } from './farmacia-perfil.component';


export const FarmaciaPerfilRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: FarmaciaPerfilComponent 
      }
    ]
  }
];
