import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { login, loginFail, loginSuccess } from './auth.actions';
import { selectUserByEmail } from '../user/user.selectors';
import { clearRemember, setRemember } from '../remember/remember.actions';

@Injectable()
export class AuthEffects {
  auth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ email, remember }) =>
        combineLatest([
          this.store.select(selectUserByEmail(email)),
          of(remember),
        ]),
      ),
      map(([user, remember]) => {
        if (!user) {
          return loginFail({ error: 'Wrong email' });
        }

        this.store.dispatch(remember ? setRemember(user) : clearRemember());

        return loginSuccess(user);
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store,
  ) {}
}
