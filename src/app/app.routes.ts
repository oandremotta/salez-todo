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
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks/tasks.page').then( m => m.TasksPage)
  }
];
