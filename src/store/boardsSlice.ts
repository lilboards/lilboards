import { createSlice } from '@reduxjs/toolkit';

import {
  boardsRef,
  getBoardDataRef,
  getUserBoardRef,
  getUserBoardsRef,
} from '../firebase';
import { BOARD, BOARDS } from '../constants';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Board as BoardData, Id } from '../types';

type Board = BoardData & {
  focus?: boolean;
};

type Boards = {
  [id: string]: Board;
};

export const initialState: Boards = {};

export const name = BOARDS;

const slice = createSlice({
  name,
  initialState,

  reducers: {
    addBoard: (state, action: PayloadAction<Id>) => {
      const now = Date.now();
      const board: BoardData = {
        created: now,
        name: '',
        updated: now,
      };
      const boardRef = boardsRef.push();
      boardRef.child(BOARD).set(board);

      const boardId = boardRef.key as Id;
      const userId = action.payload;
      getUserBoardsRef(userId).update({
        [boardId]: true,
      });

      state[boardId] = {
        ...board,
        focus: true,
      };
    },

    editBoard: (
      state,
      action: PayloadAction<Pick<Board, 'name'> & { boardId: Id }>
    ) => {
      const { boardId, name } = action.payload;
      const board = {
        name,
        updated: Date.now(),
      };
      getBoardDataRef(boardId).update(board);
      state[boardId] = {
        ...state[boardId],
        ...board,
      };
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
