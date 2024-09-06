import { createReducer, on } from '@ngrx/store';

import { setRemember, clearRemember } from './remember.actions';

export interface RememberState {
  id?: number;
}

export const initialState: RememberState = {};

export const rememberReducer = createReducer(
  initialState,
  on(setRemember, (state, { id }) => ({
    ...state,
    id,
  })),
  on(clearRemember, () => initialState),
);
