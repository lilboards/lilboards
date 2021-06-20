import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Id } from '../types';

type User = {
  email: string | null;
  id: Id;
};

export const initialState: User = {
  email: null,
  id: '',
};

export const name = 'user';

const slice = createSlice({
  name,
  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },

    resetUser: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = slice;
