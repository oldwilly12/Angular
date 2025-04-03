import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'basic',
    title: 'Pipes Basicos',
    loadComponent: () => import ('./pages/basic-page/basic-page.component'),
  },
  {
    path: 'numbers',
    title: 'Number Pipe',
    loadComponent: () => import ('./pages/numbers-page/numbers-page.component'),
  },
  {
    path: 'uncommon',
    title: 'Pipes no tan comunes',
    loadComponent: () => import ('./pages/uncommon-page/uncommon-page.component'),
  },
  {
    path: 'custom',
    title: 'Pipes Personalizados',
    loadComponent: () => import ('./pages/custom-page/custom-page.component'),
  },
  {
    path: '**',
    redirectTo: 'basic'
  },
];
