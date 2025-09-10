import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./widgets/display/display').then(m => m.DisplayComponent)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./widgets/detail/detail').then(m => m.DetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
