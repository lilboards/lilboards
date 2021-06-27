import { createSlice } from '@reduxjs/toolkit';

import { getBoardDataRef, getUserBoardRef } from '../firebase';
import { BOARDS } from '../constants';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Board, Id } from '../types';

type Boards = {
  [boardId: string]: Board;
};

export const initialState: Boards = {};

export const name = BOARDS;

const slice = createSlice({
  name,
  initialState,

  reducers: {
    editBoard: (
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
      getBoardDataRef(boardId).remove();
      getUserBoardRef(userId, boardId).remove();
      delete state[boardId];
    },

    loadBoard: (state, action: PayloadAction<(Board & { id?: Id }) | null>) => {
      if (action.payload) {
        const { id, ...board } = action.payload;
        if (id) {
          state[id] = {
            ...state[id],
            ...board,
          };
        }
      }
    },

    resetBoards: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = slice;
