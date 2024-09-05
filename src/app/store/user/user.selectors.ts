import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');
export const selectAllUsers = createSelector(selectUserState, selectAll);
