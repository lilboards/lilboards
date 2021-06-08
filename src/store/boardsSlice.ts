import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boardsRef, usersRef } from '../firebase';

type Board = {
  focus?: boolean;
  name: string;
};

type Boards = {
  [id: string]: Board;
};

type Id = string;

export const initialState: Boards = {};

export const name = 'boards';

const slice = createSlice({
  name,
  initialState,

  reducers: {
    addBoard: (state, action: PayloadAction<Id>) => {
      const board: Board = {
        name: '',
      };
      const boardRef = boardsRef.push();
      boardRef.set(board);

      const boardId = boardRef.key as Id;
      const userId = action.payload;
      usersRef
        .child(userId)
        .child('boards')
        .update({ [boardId]: true });

      board.focus = true;
      state[boardId] = board;
    },

    editBoard: (state, action: PayloadAction<Board & { id: Id }>) => {
      const board = action.payload;
      /* istanbul ignore next */
      if (board.focus) {
        delete board.focus;
      }
      const { id, ...restBoard } = board;
      boardsRef.child(id).update(restBoard);
      state[id] = restBoard;
    },

    deleteBoard: (
      state,
      action: PayloadAction<{ boardId: Id; userId: Id }>
    ) => {
      const { boardId, userId } = action.payload;
      boardsRef.child(boardId).remove();
      usersRef.child(userId).child('boards').child(boardId).remove();
      delete state[boardId];
    },

    loadBoard: (state, action: PayloadAction<(Board & { id: Id }) | null>) => {
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
