import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import("../users/users.page").then((m) => m.UsersPage),
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import("../tasks/tasks.page").then((m) => m.TasksPage),
      }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/users',
    pathMatch: 'full',
  },
];
