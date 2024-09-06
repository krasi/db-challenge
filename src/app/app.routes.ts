import { Routes } from '@angular/router';

import { UsersComponent } from './dashboard/users/users.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
];
