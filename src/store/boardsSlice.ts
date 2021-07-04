import { createSlice } from '@reduxjs/toolkit';

import {
  debouncedSaveBoardData,
  removeBoard,
  removeUserBoard,
  saveBoardData,
} from '../firebase';
import { BOARDS } from '../constants';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Board, Boards, Id } from '../types';

export const initialState: Boards = {};

export const name = BOARDS;

const boardsSlice = createSlice({
  name,
  initialState,

  reducers: {
    updateBoard: (
      state,
      action: PayloadAction<{
        board: Partial<Board>;
        boardId: Id;
        debounce?: boolean;
      }>
    ) => {
      const { board, boardId, debounce } = action.payload;
      state[boardId] = state[boardId] || {};
      Object.assign(state[boardId], board);
      if (debounce) {
        debouncedSaveBoardData(boardId, board);
      } else {
        saveBoardData(boardId, board);
      }
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
