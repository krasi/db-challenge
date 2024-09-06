import { createReducer, on } from '@ngrx/store';

import { type User } from '../../types/User';
import { setRemember, clearRemember } from './remember.actions';

export type RememberState = Partial<User>;

export const initialState: RememberState = {};

export const rememberReducer = createReducer(
  initialState,
  on(setRemember, (state, user) => ({
    ...state,
    ...user,
  })),
  on(clearRemember, () => initialState),
);
