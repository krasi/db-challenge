import { createAction, props } from '@ngrx/store';
import { type User } from '../../types/User';

export const setRemember = createAction('[Remember] Set', props<User>());
export const clearRemember = createAction('[Remember] Clear');
