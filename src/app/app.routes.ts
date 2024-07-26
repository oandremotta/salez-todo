import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.routes').then(m => m.routes),
  },
  {
    path: "",
    redirectTo: "tabs/tasks",
    pathMatch: "full"
  }
];
