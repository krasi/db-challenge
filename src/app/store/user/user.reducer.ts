import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { type User } from '../../types/User';
import {
  addUser,
  addUserSuccess,
  deleteUsers,
  deleteUsersSuccess,
  loadUsers,
  loadUsersSuccess,
  populateUsers,
  updateUser,
  updateUserSuccess,
} from './user.actions';
import { usersMock } from '../../mocks/users';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export type UserState = EntityState<User> & {
  loading: boolean;
  error: string | null;
};

export const initialState: UserState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const userReducer = createReducer(
  initialState,
  on(populateUsers, (state) => adapter.addMany(usersMock, state)),
  on(loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadUsersSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(addUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(addUserSuccess, (state, user) => ({
    ...adapter.addOne(user, state),
    loading: false,
  })),
  on(updateUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(updateUserSuccess, (state, { update }) => ({
    ...adapter.updateOne(update, state),
    loading: false,
  })),
  on(deleteUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(deleteUsersSuccess, (state, { ids }) => ({
    ...adapter.removeMany(ids, state),
    loading: false,
  })),
);

export const { selectAll, selectTotal, selectEntities } =
  adapter.getSelectors();
