import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
  id: '',
};

export const name = 'user';

const slice = createSlice({
  name,
  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },

    resetUser: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = slice;
