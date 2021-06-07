import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { firebaseDatabase } from '../firebase';

type Board = {
  id: string;
  name: string;
};

type Boards = {
  [id: string]: Board;
};

export const initialState: Boards = {};

export const name = 'boards';

const boardsRef = firebaseDatabase.ref(name);

const slice = createSlice({
  name,
  initialState,

  reducers: {
    addBoard: (state) => {
      const id = boardsRef.push().key as string;
      state[id] = {
        id,
        name: '',
      };
    },

    editBoard: (state, action: PayloadAction<Board>) => {
      state[action.payload.id] = action.payload;
    },

    resetBoards: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = slice;
