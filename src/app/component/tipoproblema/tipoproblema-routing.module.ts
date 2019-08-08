import { Routes, RouterModule } from '@angular/router';
import { TipoproblemaComponent  } from './tipoproblema.component';

export const TipoProblemaRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: TipoproblemaComponent 
      }
    ]
  }
];
