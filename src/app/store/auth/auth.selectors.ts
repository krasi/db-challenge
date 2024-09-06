import { createFeatureSelector, createSelector } from '@ngrx/store';
import { type AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectAuthUser = createSelector(
  selectAuthState,
  ({ entity }) => entity,
);
export const selectAuthError = createSelector(
  selectAuthState,
  ({ error }) => error,
);
export const selectAuthLoading = createSelector(
  selectAuthState,
  ({ loading }) => loading,
);
