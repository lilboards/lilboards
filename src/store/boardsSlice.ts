import { createSlice } from '@reduxjs/toolkit';
import { boardsRef, usersRef } from '../firebase';
import { BOARDS } from '../constants';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Id } from '../types';

type Board = {
  created: number;
  focus?: boolean;
  name: string;
  updated: number;
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
      const board: Board = {
        created: now,
        name: '',
        updated: now,
      };
      const boardRef = boardsRef.push();
      boardRef.set(board);

      const boardId = boardRef.key as Id;
      const userId = action.payload;
      usersRef
        .child(userId)
        .child(BOARDS)
        .update({ [boardId]: true });

      board.focus = true;
      state[boardId] = board;
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
      boardsRef.child(boardId).update(board);
      state[boardId] = {
        ...state[boardId],
        ...board,
      };
    },

    deleteBoard: (state, action: PayloadAction<{ id: Id; userId: Id }>) => {
      const { id, userId } = action.payload;
      boardsRef.child(id).remove();
      usersRef.child(userId).child(BOARDS).child(id).remove();
      delete state[id];
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
