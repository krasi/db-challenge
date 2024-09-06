import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');
export const selectAllUsers = createSelector(selectUserState, selectAll);
export const selectUserByEmail = (byEmail: string) =>
  createSelector(selectAllUsers, (users) =>
    users.find(({ email }) => email === byEmail),
  );
export const selectUserById = (byId: number) =>
  createSelector(selectAllUsers, (users) =>
    users.find(({ id }) => id === byId),
  );
