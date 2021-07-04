import { createSlice } from '@reduxjs/toolkit';

import { removeBoard, removeUserBoard } from '../firebase';
import { BOARDS } from '../constants';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Board, Id } from '../types';

type Boards = {
  [boardId: string]: Board;
};

export const initialState: Boards = {};

export const name = BOARDS;

const boardsSlice = createSlice({
  name,
  initialState,

  reducers: {
    updateBoard: (
      state,
      action: PayloadAction<Partial<Board> & { boardId: Id }>
    ) => {
      const { boardId, ...board } = action.payload;
      state[boardId] = state[boardId] || {};
      Object.assign(state[boardId], board);
    },

    deleteBoard: (
      state,
      action: PayloadAction<{ boardId: Id; userId: Id }>
    ) => {
      const { boardId, userId } = action.payload;
      removeBoard(boardId);
      removeUserBoard(userId, boardId);
      delete state[boardId];
    },

    loadBoard: (state, action: PayloadAction<(Board & { id?: Id }) | null>) => {
      if (action.payload) {
        const { id, ...board } = action.payload;
        if (id) {
          state[id] = state[id] || {};
          Object.assign(state[id], board);
        }
      }
    },

    resetBoards: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = boardsSlice;
