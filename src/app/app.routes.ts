import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.routes').then(m => m.routes),
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.routes').then(m => m.routes),
  },
  // {
  //   path: 'entrar',
  //   loadComponent: () => import('./pages/autenticacao/login/login.page').then(m => m.LoginPage)
  // },
];
