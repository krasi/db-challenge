import { createFeatureSelector } from '@ngrx/store';
import { type AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
