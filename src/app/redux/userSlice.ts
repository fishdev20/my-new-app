// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

import context from '../../database/dataContextApi';

export interface UserData {
    id: string;
    birthDay: string | null;
    name: string;
    email: string;
    age: number | null;
}

interface UsersState {
    usersList: UserData[];
}


const initialState: UsersState = {
    usersList: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    initUsers: (state, action: PayloadAction<UserData[]>) => {
      state.usersList = action.payload;
    },
    addUser: (state, action: PayloadAction<any>) => {
      const newUser: UserData = {
        id: action.payload.id,
        birthDay: action.payload.birthDay,
        name: action.payload.name,
        email: action.payload.email,
        age: action.payload.age
      }
      if(newUser.name === '' && newUser.email === '') {
        context.toggleNotification('alert')
      }
      else {
        context.addUser(newUser)
        state.usersList = [...state.usersList, newUser];
      }

    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const index = state.usersList.findIndex(
        (user) => user.id === action.payload
      );
      context.deleteUser(action.payload)
      state.usersList.splice(index, 1);
    },
  },
});

export const { initUsers, addUser, deleteUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.usersList;

export default usersSlice.reducer;