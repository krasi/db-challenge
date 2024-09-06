import { createFeatureSelector, createSelector } from '@ngrx/store';
import { type RememberState } from './remember.reducer';

export const selectRemember = createFeatureSelector<RememberState>('remember');
export const selectRememberId = createSelector(selectRemember, ({ id }) => id);
