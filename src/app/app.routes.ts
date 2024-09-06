import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { WelcomeBackComponent } from './auth/welcome-back/welcome-back.component';
import { UsersComponent } from './dashboard/users/users.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'welcome',
    component: WelcomeBackComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
];
