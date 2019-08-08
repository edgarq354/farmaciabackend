import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent  } from './configuracion.component';

export const ConfiguracionRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: ConfiguracionComponent 
      }
    ]
  }
];
