import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { login } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  remember = new FormControl(false);

  constructor(private store: Store) {}

  login() {
    if (
      this.email.valid &&
      this.password.valid &&
      this.email.value &&
      this.password.value
    ) {
      this.store.dispatch(
        login({
          email: this.email.value,
          password: this.password.value,
          remember: !!this.remember.value,
        }),
      );
    }
  }
}
