import { createAction, props } from '@ngrx/store';
import { User } from '../../types/User';
import { type AuthProps } from './auth.reducer';

export const login = createAction('[Auth] Login', props<AuthProps>());
export const loginSuccess = createAction('[Auth] Login Success', props<User>());
export const loginFail = createAction(
  '[Auth] Login Fail',
  props<{ error: string }>(),
);
export const logout = createAction('[Auth] Logout');
