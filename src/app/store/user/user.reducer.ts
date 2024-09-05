import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { type User } from '../../types/User';
import { populate } from './user.actions';
import { usersMock } from '../../mocks/users';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export type UserState = EntityState<User>;

export const initialState: UserState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const userReducer = createReducer(
  initialState,
  on(populate, (state) => adapter.addMany(usersMock, state)),
);

export const { selectAll, selectTotal } = adapter.getSelectors();
