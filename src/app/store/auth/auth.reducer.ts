import { createReducer, on } from '@ngrx/store';

import { type User } from '../../types/User';
import { type SingleEntity } from '../../types/SingleEntity';
import { login, loginFail, loginSuccess, logout } from './auth.actions';

export type AuthState = SingleEntity<User>;

export interface AuthProps {
  email: string;
  password: string;
  remember?: boolean;
}

export const initialState: AuthState = {
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
  })),
  on(loginFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loginSuccess, (state, data) => ({
    ...state,
    entity: data,
    loading: false,
  })),
  on(logout, () => initialState),
);
