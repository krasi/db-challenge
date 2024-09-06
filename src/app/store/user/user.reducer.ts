import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { type User } from '../../types/User';
import {
  addUser,
  deleteUsers,
  populateUsers,
  updateUser,
} from './user.actions';
import { usersMock } from '../../mocks/users';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export type UserState = EntityState<User>;

export const initialState: UserState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const userReducer = createReducer(
  initialState,
  on(populateUsers, (state) => adapter.addMany(usersMock, state)),
  on(addUser, (state, user) => adapter.addOne(user, state)),
  on(updateUser, (state, { update }) => adapter.updateOne(update, state)),
  on(deleteUsers, (state, { ids }) => adapter.removeMany(ids, state)),
);

export const { selectAll, selectTotal, selectEntities } =
  adapter.getSelectors();
