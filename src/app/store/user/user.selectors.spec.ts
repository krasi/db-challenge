import {
  selectAllUsers,
  selectUserByEmail,
  selectUserById,
} from './user.selectors';
import { UserState } from './user.reducer';
import { type User } from '../../types/User';
import { usersList } from './user.reducer.spec';

describe('User Selectors', () => {
  const initialState: UserState = {
    ids: ['1', '2', '3', '4', '5'],
    entities: usersList,
    loading: false,
    error: null,
  };

  it('should select all users with selectAllUsers', () => {
    const result = selectAllUsers.projector(initialState);
    expect(result.length).toEqual(5);
  });

  it('should select user by email with selectUserByEmail', () => {
    const result = selectUserByEmail('user5@example.com').projector(
      Object.values(initialState.entities as Record<string, User>),
    );
    expect(result?.name).toEqual('User #5');
  });

  it('should select user by email with selectUserById', () => {
    const result = selectUserById(3).projector(
      Object.values(initialState.entities as Record<string, User>),
    );
    expect(result?.name).toEqual('User #3');
  });
});
