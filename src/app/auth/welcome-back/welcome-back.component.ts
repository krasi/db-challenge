import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
} from '@angular/core';

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
import { BehaviorSubject, first } from 'rxjs';
import { selectUserById } from '../../store/user/user.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-welcome-back',
  standalone: true,
  imports: [CardModule, ButtonModule, AvatarModule, UserComponent, AsyncPipe],
  templateUrl: './welcome-back.component.html',
  styleUrl: './welcome-back.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeBackComponent {
  id = input.required<number>();
  user$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private store: Store) {
    effect(() => {
      if (this.id()) {
        this.store
          .select(selectUserById(this.id()))
          .pipe(first())
          .subscribe((user) => {
            if (!user?.name) {
              this.useDifferent();
              return;
            }

            this.user$.next(user);
          });
      }
    });
  }

  login() {
    this.store.dispatch(authRemember());
  }

  useDifferent() {
    this.store.dispatch(clearRemember());
  }
}
