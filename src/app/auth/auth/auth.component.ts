import { Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { selectRemember } from '../../store/remember/remember.selectors';
import { LoginComponent } from '../login/login.component';
import { WelcomeBackComponent } from '../welcome-back/welcome-back.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AsyncPipe, LoginComponent, WelcomeBackComponent, JsonPipe],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  remember$ = this.store
    .select(selectRemember)
    .pipe(map((user) => (!user.name ? undefined : user)));

  constructor(private store: Store) {}
}
