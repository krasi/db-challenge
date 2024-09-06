import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User } from '../../types/User';

export const populateUsers = createAction('[Users] Populate users');

export const addUser = createAction('[Users] Add user', props<User>());
export const updateUser = createAction(
  '[Users] Update user',
  props<{ update: Update<User> }>(),
);
export const deleteUsers = createAction(
  '[Users] Delete users',
  props<{ ids: string[] }>(),
);
