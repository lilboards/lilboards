import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boardsRef } from '../firebase';

import type { Id } from '../types';

type Column = {
  created: number;
  name: string;
  updated: number;
};

type Columns = {
  [id: string]: Column;
};

export const initialState: Columns = {};

const COLUMNS = 'columns';
export const name = COLUMNS;

const slice = createSlice({
  name,
  initialState,

  reducers: {
    addColumn: (state, action: PayloadAction<Id>) => {
      const now = Date.now();
      const column: Column = {
        created: now,
        name: '',
        updated: now,
      };

      const boardId = action.payload;
      const columnRef = boardsRef.child(boardId).child(COLUMNS).push();
      const columnId = columnRef.key as Id;
      columnRef.set(column);

      state[columnId] = column;
    },

    loadColumns: (state, action: PayloadAction<Columns>) => {
      return action.payload;
    },

    resetColumns: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = slice;
