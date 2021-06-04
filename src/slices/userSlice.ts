import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
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
  },
});

export const { actions, reducer } = slice;
