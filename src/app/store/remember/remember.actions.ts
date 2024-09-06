import { createAction, props } from '@ngrx/store';

export const setRemember = createAction(
  '[Remember] Set',
  props<{ id: number }>(),
);
export const clearRemember = createAction('[Remember] Clear');
export const authRemember = createAction('[Remember] Auth');
