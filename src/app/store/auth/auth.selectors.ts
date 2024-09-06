import { createFeatureSelector, createSelector } from '@ngrx/store';
import { type AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectAuthUser = createSelector(
  selectAuthState,
  ({ entity }) => entity,
);
