import { createSlice } from '@reduxjs/toolkit';

import { getColumnItemIdsRef, getColumnRef } from '../firebase';
import { COLUMNS } from '../constants';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Column, Id } from '../types';

type Columns = {
  [columnId: string]: Column;
};

export const initialState: Columns = {};

export const name = COLUMNS;

const columnsSlice = createSlice({
  name,
  initialState,

  reducers: {
    addColumn: (
      state,
      action: PayloadAction<{ boardId: Id; columnId: Id }>
    ) => {
      const { boardId, columnId } = action.payload;
      const now = Date.now();
      const column: Column = {
        created: now,
        name: '',
        updated: now,
      };
      getColumnRef(boardId, columnId).set(column);
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

    deleteColumn: (
      state,
      action: PayloadAction<{ boardId: Id; columnId: Id }>
    ) => {
      const { boardId, columnId } = action.payload;
      getColumnRef(boardId, columnId).remove();
      delete state[columnId];
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

export const { actions, reducer } = columnsSlice;
