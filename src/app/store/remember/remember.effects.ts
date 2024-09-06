import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { authRemember } from './remember.actions';
import { selectRemember } from './remember.selectors';
import { loginFail, loginSuccess } from '../auth/auth.actions';
import { selectUserByEmail } from '../user/user.selectors';

@Injectable()
export class RememberEffects {
  authRemember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authRemember),
      switchMap(() => this.store.select(selectRemember)),
      switchMap(({ email }) =>
        email ? this.store.select(selectUserByEmail(email)) : of(null),
      ),
      map((user) => {
        if (!user) {
          return loginFail({ error: 'Wrong email' });
        }

        return loginSuccess(user);
      }),
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
