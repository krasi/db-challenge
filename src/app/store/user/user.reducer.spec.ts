import { UserState, userReducer } from './user.reducer';

import { addUser, updateUser, deleteUsers } from './user.actions';
import { User } from '../../types/User';

export const usersList = {
  '1': {
    id: 1,
    name: 'User #1',
    email: 'user1@example.com',
    title: 'User 1 Job',
    department: 'Tech',
  },
  '2': {
    id: 2,
    name: 'User #2',
    email: 'user2@example.com',
    title: 'User 2 Job',
    department: 'Tech',
  },
  '3': {
    id: 3,
    name: 'User #3',
    email: 'user3@example.com',
    title: 'User 3 Job',
    department: 'Tech',
  },
  '4': {
    id: 4,
    name: 'User #4',
    email: 'user4@example.com',
    title: 'User 4 Job',
    department: 'Tech',
  },
  '5': {
    id: 5,
    name: 'User #5',
    email: 'user5@example.com',
    title: 'User 5 Job',
    department: 'Tech',
  },
};

const initialState: UserState = {
  ids: ['1', '2', '3', '4', '5'],
  entities: usersList,
  loading: false,
  error: null,
};

describe('User Reducer', () => {
  it('addUser should add an user', () => {
    const newUser = {
      id: 6,
      name: 'User #6',
      email: 'user6@example.com',
      title: 'User 6 Job',
      department: 'Tech',
    };
    const action = addUser(newUser);
    const state = userReducer(initialState, action);

    expect(Object.values(state.entities).length).toEqual(6);
  });

  it('updateUser should change item name', () => {
    const updatedUser = {
      name: 'User #3 NEW',
    };
    const action = updateUser({
      update: {
        id: '3',
        changes: updatedUser,
      },
    });
    const state = userReducer(initialState, action);

    expect(
      (Object.values(state.entities) as User[]).find(({ id }) => id === 3),
    ).toEqual({
      id: 3,
      name: 'User #3 NEW',
      email: 'user3@example.com',
      title: 'User 3 Job',
      department: 'Tech',
    });
  });

  it('deleteUsers should remove an item', () => {
    const action = deleteUsers({ ids: ['3', '5'] });
    const state = userReducer(initialState, action);

    const userList = Object.values(state.entities) as User[];

    expect(userList.find(({ id }) => id === 3)).toBeUndefined();
    expect(userList.find(({ id }) => id === 5)).toBeUndefined();
  });
});
