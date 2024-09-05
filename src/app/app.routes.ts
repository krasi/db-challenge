import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { WelcomeBackComponent } from './auth/welcome-back/welcome-back.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'welcome',
    component: WelcomeBackComponent,
  },
];
