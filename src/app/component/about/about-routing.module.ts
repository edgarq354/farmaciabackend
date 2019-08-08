import { Routes } from '@angular/router';
import { AboutComponent } from './about.component';

export const AboutRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AboutComponent
      }
    ]
  }
];
