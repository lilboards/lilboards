import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  debouncedSaveBoardData,
  removeBoard,
  removeUserBoard,
  saveBoardData,
} from 'src/firebase';
import type { Board, Boards, Id } from 'src/types';

export const initialState: Boards = {};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,

  reducers: {
    updateBoard: (
      state,
      action: PayloadAction<{
        board: Partial<Board>;
        boardId: Id;
        debounce?: boolean;
        skipSave?: boolean;
      }>,
    ) => {
      const { board, boardId, debounce, skipSave } = action.payload;
      state[boardId] = state[boardId] || {};
      Object.assign(state[boardId], board);

      if (!skipSave) {
        if (debounce) {
          debouncedSaveBoardData(boardId, board);
        } else {
          saveBoardData(boardId, board);
        }
      }
    },

    deleteBoard: (
      state,
      action: PayloadAction<{ boardId: Id; userId: Id; skipSave?: boolean }>,
    ) => {
      const { boardId, skipSave, userId } = action.payload;
      delete state[boardId];
      if (!skipSave) {
        removeBoard(boardId);
        removeUserBoard(userId, boardId);
      }
    },

    loadBoard: (
      state,
      action: PayloadAction<{ board: Board; boardId: Id }>,
    ) => {
      const { board, boardId } = action.payload;
      state[boardId] = state[boardId] || {};
      Object.assign(state[boardId], board);
    },

    resetBoards: () => {
      return initialState;
    },
  },
});
