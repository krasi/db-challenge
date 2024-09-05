import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { type User } from '../../types/User';
import { populate } from './user.actions';
import { usersMock } from '../../mocks/users';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export type State = EntityState<User>;

export const initialState: State = adapter.getInitialState();

export const userReducer = createReducer(
  initialState,
  on(populate, (state) => adapter.addMany(usersMock, state)),
);
