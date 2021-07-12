import { createSlice } from '@reduxjs/toolkit';

import {
  debouncedUpdateColumn,
  removeColumn,
  saveColumnItemIds,
  updateColumn,
} from '../firebase';
import { COLUMNS } from '../constants';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Column, ColumnItemIds, Columns, Id } from '../types';

export const initialState: Columns = {};

export const name = COLUMNS;

const columnsSlice = createSlice({
  name,
  initialState,

  reducers: {
    updateColumn: (
      state,
      action: PayloadAction<{
        boardId: Id;
        column: Partial<Column>;
        columnId: Id;
        debounce?: boolean;
      }>
    ) => {
      const { boardId, column, columnId, debounce } = action.payload;
      state[columnId] = state[columnId] || {};
      Object.assign(state[columnId], column);
      if (debounce) {
        debouncedUpdateColumn(boardId, columnId, column);
      } else {
        updateColumn(boardId, columnId, column);
      }
    },

    deleteColumn: (
      state,
      action: PayloadAction<{ boardId: Id; columnId: Id }>
    ) => {
      const { boardId, columnId } = action.payload;
      removeColumn(boardId, columnId);
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
      saveColumnItemIds(boardId, { [columnId]: column.itemIds });
    },

    removeColumnItemId: (
      state,
      action: PayloadAction<{ boardId: Id; columnId: Id; itemId: Id }>
    ) => {
      const { boardId, columnId, itemId } = action.payload;
      const column = state[columnId];
      if (column) {
        const itemIds = (column.itemIds || []).filter((id) => id !== itemId);
        column.itemIds = itemIds;
        saveColumnItemIds(boardId, { [columnId]: itemIds });
      }
    },

    setColumnItemIds: (
      state,
      action: PayloadAction<{
        boardId: Id;
        columnItemIds: ColumnItemIds;
      }>
    ) => {
      const { boardId, columnItemIds } = action.payload;
      Object.entries(columnItemIds).forEach(([columnId, itemIds]) => {
        state[columnId].itemIds = itemIds;
      });
      saveColumnItemIds(boardId, columnItemIds);
    },

    resetColumns: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = columnsSlice;
