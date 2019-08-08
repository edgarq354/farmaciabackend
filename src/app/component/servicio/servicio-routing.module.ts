import { Routes, RouterModule } from '@angular/router';
import { ServicioComponent } from './servicio.component';

export const ServicioRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: ServicioComponent
      }
    ]
  }
];
