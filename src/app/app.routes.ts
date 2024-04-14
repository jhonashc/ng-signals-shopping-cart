import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/shopping-cart/shopping-cart.component').then(
        (m) => m.ShoppingCartComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
