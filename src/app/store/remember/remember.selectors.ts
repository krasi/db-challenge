import { createFeatureSelector } from '@ngrx/store';
import { type RememberState } from './remember.reducer';

export const selectRemember = createFeatureSelector<RememberState>('remember');
