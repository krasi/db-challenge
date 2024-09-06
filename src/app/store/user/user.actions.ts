import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User } from '../../types/User';

export const populateUsers = createAction('[Users] Populate users');

export const loadUsers = createAction('[Users] Load users');
export const loadUsersSuccess = createAction('[Users] Load users success');
export const addUser = createAction('[Users] Add user', props<User>());
export const addUserSuccess = createAction(
  '[Users] Add user success',
  props<User>(),
);
export const updateUser = createAction(
  '[Users] Update user',
  props<{ update: Update<User> }>(),
);
export const updateUserSuccess = createAction(
  '[Users] Update user success',
  props<{ update: Update<User> }>(),
);
export const deleteUsers = createAction(
  '[Users] Delete users',
  props<{ ids: string[] }>(),
);
export const deleteUsersSuccess = createAction(
  '[Users] Delete users success',
  props<{ ids: string[] }>(),
);
