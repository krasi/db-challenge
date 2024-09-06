import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, combineLatest } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';

import { login, loginFail, loginSuccess } from './auth.actions';
import { selectUserByEmail } from '../user/user.selectors';
import { clearRemember, setRemember } from '../remember/remember.actions';
import { Router } from '@angular/router';

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
      delay(500),
      tap(() => {
        this.router.navigate(['/users']);
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private router: Router,
  ) {}
}
