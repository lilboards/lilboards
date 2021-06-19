import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

type User = {
  email: string | null;
  id: string;
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
