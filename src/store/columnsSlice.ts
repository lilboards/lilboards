import { createSlice } from '@reduxjs/toolkit';

import { removeColumn, removeItem, saveColumnItemIds } from '../firebase';
import { COLUMNS, ITEM_IDS } from '../constants';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Column, Columns, Id } from '../types';

export const initialState: Columns = {};

export const name = COLUMNS;

const columnsSlice = createSlice({
  name,
  initialState,

  reducers: {
    updateColumn: (
      state,
      action: PayloadAction<Partial<Column> & { columnId: Id }>
    ) => {
      const { columnId, ...column } = action.payload;
      state[columnId] = state[columnId] || {};
      Object.assign(state[columnId], column);
    },

    deleteColumn: (
      state,
      action: PayloadAction<{ boardId: Id; columnId: Id }>
    ) => {
      const { boardId, columnId } = action.payload;
      removeColumn(boardId, columnId);
      /* istanbul ignore next */
      (state[columnId][ITEM_IDS] || []).forEach((itemId) =>
        removeItem(boardId, itemId)
      );
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
        const itemIds = (column[ITEM_IDS] || []).filter((id) => id !== itemId);
        column[ITEM_IDS] = itemIds;
        saveColumnItemIds(boardId, { [columnId]: itemIds });
      }
    },

    setColumnItemIds: (
      state,
      action: PayloadAction<{
        boardId: Id;
        columnItemIds: { [columnId: string]: Id[] };
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
