import { createSlice } from '@reduxjs/toolkit';

import { USER } from '../constants';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Id } from '../types';

type User = {
  editing: {
    boardId: Id;
    columnId: Id;
  };
  email: string | null;
  id: Id;
};

export const initialState: User = {
  editing: {
    boardId: '',
    columnId: '',
  },
  email: null,
  id: '',
};

export const name = USER;

const userSlice = createSlice({
  name,
  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<Pick<User, 'email' | 'id'>>) => {
      Object.assign(state, action.payload);
    },

    toggleUserEditing: (
      state,
      action: PayloadAction<Partial<User['editing']>>
    ) => {
      Object.assign(state.editing, action.payload);
    },

    resetUser: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = userSlice;
