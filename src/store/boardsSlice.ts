import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Board = {
  id: string;
  name: string;
};

type State = {
  [id: string]: Board;
};

export const initialState: State = {};

export const name = 'boards';

const slice = createSlice({
  name,
  initialState,

  reducers: {
    addBoard: (state, action: PayloadAction<Board>) => {
      const { id } = action.payload;
      state[id] = action.payload;
    },

    resetBoards: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = slice;
