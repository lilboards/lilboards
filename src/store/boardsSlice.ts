import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boardsRef } from '../firebase';

type Board = {
  focus?: boolean;
  id: string;
  name: string;
};

type Boards = {
  [id: string]: Board;
};

export const initialState: Boards = {};

export const name = 'boards';

const slice = createSlice({
  name,
  initialState,

  reducers: {
    addBoard: (state) => {
      const board: Board = {
        id: '',
        name: '',
      };
      const boardRef = boardsRef.push();
      board.id = boardRef.key as string;
      boardRef.set(board);
      board.focus = true;
      state[board.id] = board;
    },

    editBoard: (state, action: PayloadAction<Board>) => {
      const { payload } = action;
      delete payload.focus;
      const { id, ...restPayload } = payload;
      boardsRef.child(id).update(restPayload);
      state[id] = payload;
    },

    deleteBoard: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },

    loadBoards: (state, action: PayloadAction<Boards | null>) => {
      if (action.payload) {
        return action.payload;
      }
    },

    resetBoards: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = slice;
