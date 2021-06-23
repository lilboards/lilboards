import { createSlice } from '@reduxjs/toolkit';

import { getColumnItemIdsRef, getColumnRef, getColumnsRef } from '../firebase';
import { COLUMNS } from '../constants';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Id } from '../types';

type Column = {
  created: number;
  itemIds?: Id[];
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

    editColumn: (
      state,
      action: PayloadAction<
        Pick<Column, 'name'> & { boardId: Id; columnId: Id }
      >
    ) => {
      const { boardId, columnId, name } = action.payload;
      const column = {
        name,
        updated: Date.now(),
      };
      getColumnRef(boardId, columnId).update(column);
      state[columnId] = {
        ...state[columnId],
        ...column,
      };
    },

    deleteColumn: (state, action: PayloadAction<{ boardId: Id; id: Id }>) => {
      const { boardId, id } = action.payload;
      getColumnRef(boardId, id).remove();
      delete state[id];
    },

    loadColumns: (state, action: PayloadAction<Columns>) => {
      return action.payload;
    },

    addColumnItemId: (
      state,
      action: PayloadAction<{ boardId: Id; columnId: Id; itemId: Id }>
    ) => {
      const { boardId, columnId, itemId } = action.payload;
      const column = state[columnId];
      column.itemIds = column.itemIds || [];
      column.itemIds.push(itemId);
      getColumnItemIdsRef(boardId, columnId).set(column.itemIds);
    },

    resetColumns: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = slice;
