import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boardsRef, usersRef } from '../firebase';

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
    addBoard: (state, action: PayloadAction<string>) => {
      const board: Board = {
        name: '',
      };
      const boardRef = boardsRef.push();
      boardRef.set(board);

      const boardId = boardRef.key as string;
      const userId = action.payload;
      usersRef
        .child(userId)
        .child('boards')
        .update({ [boardId]: true });

      board.focus = true;
      state[boardId] = board;
    },

    editBoard: (state, action: PayloadAction<Board & { id: string }>) => {
      const { payload } = action;
      delete payload.focus;
      const { id, ...restPayload } = payload;
      boardsRef.child(id).update(restPayload);
      state[id] = restPayload;
    },

    deleteBoard: (
      state,
      action: PayloadAction<{ boardId: string; userId: string }>
    ) => {
      const { boardId, userId } = action.payload;
      boardsRef.child(boardId).remove();
      usersRef.child(userId).child('boards').child(boardId).remove();
      delete state[boardId];
    },

    loadBoard: (
      state,
      action: PayloadAction<(Board & { id: string }) | null>
    ) => {
      const board = action.payload;
      if (board) {
        const { id, ...restBoard } = board;
        state[id] = restBoard;
      }
    },

    resetBoards: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = slice;
