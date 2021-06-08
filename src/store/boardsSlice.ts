import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boardsRef } from '../firebase';

type Board = {
  focus?: boolean;
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
        name: '',
      };
      const boardRef = boardsRef.push();
      boardRef.set(board);
      board.focus = true;
      state[boardRef.key as string] = board;
    },

    editBoard: (state, action: PayloadAction<Board & { id: string }>) => {
      const { payload } = action;
      delete payload.focus;
      const { id, ...restPayload } = payload;
      boardsRef.child(id).update(restPayload);
      state[id] = restPayload;
    },

    deleteBoard: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      boardsRef.child(id).remove();
      delete state[id];
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
