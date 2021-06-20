import { createSlice } from '@reduxjs/toolkit';

import { getColumnRef, getColumnsRef } from '../firebase';
import { COLUMNS } from '../constants';

import type { PayloadAction } from '@reduxjs/toolkit';
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
      const columnsRef = getColumnsRef(boardId);
      const columnRef = columnsRef.push();
      const columnId = columnRef.key as Id;
      columnRef.set(column);

      state[columnId] = column;
    },

    deleteColumn: (state, action: PayloadAction<{ boardId: Id; id: Id }>) => {
      const { boardId, id } = action.payload;
      getColumnRef(boardId, id).remove();
      delete state[id];
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
