import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

export const HomeRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
      path: 'home',
      component: HomeComponent
      }
    ]
  }
];
