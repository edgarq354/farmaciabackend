import { Routes, RouterModule } from '@angular/router';
import { FarmaciaComponent  } from './farmacia.component';

export const FarmaciaRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: FarmaciaComponent 
      }
    ]
  }
];
