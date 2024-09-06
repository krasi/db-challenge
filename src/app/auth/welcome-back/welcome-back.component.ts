import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

import { UserComponent } from '../../core/user/user.component';
import { type User } from '../../types/User';
import { Store } from '@ngrx/store';
import {
  authRemember,
  clearRemember,
} from '../../store/remember/remember.actions';

@Component({
  selector: 'app-welcome-back',
  standalone: true,
  imports: [CardModule, ButtonModule, AvatarModule, UserComponent],
  templateUrl: './welcome-back.component.html',
  styleUrl: './welcome-back.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeBackComponent {
  user = input<Partial<User>>();

  constructor(private store: Store) {}

  login() {
    this.store.dispatch(authRemember());
  }

  useDifferent() {
    this.store.dispatch(clearRemember());
  }
}
