import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import {
  addUser,
  addUserSuccess,
  deleteUsers,
  deleteUsersSuccess,
  loadUsers,
  loadUsersSuccess,
  updateUser,
  updateUserSuccess,
} from './user.actions';
import { simulateNetwork } from '../../core/operators';

@Injectable()
export class UserEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      simulateNetwork(1000),
      map(() => loadUsersSuccess()),
    ),
  );
  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      simulateNetwork(),
      map((data) => addUserSuccess(data)),
    ),
  );
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      simulateNetwork(),
      map((data) => updateUserSuccess(data)),
    ),
  );
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUsers),
      simulateNetwork(),
      map((data) => deleteUsersSuccess(data)),
    ),
  );

  constructor(private actions$: Actions) {}
}
