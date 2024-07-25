import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./tasks.page').then((m) => m.TasksPage),
  },
];
