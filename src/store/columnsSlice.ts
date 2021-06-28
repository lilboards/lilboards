import { createSlice } from '@reduxjs/toolkit';

import {
  getColumnItemIdsRef,
  getColumnRef,
  removeItem,
  setColumnItemIds,
} from '../firebase';
import { COLUMNS, ITEM_IDS } from '../constants';

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
    editColumn: (
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
      getColumnRef(boardId, columnId).remove();
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
      getColumnItemIdsRef(boardId, columnId).set(column.itemIds);
    },

    removeColumnItemId: (
      state,
      action: PayloadAction<{ boardId: Id; columnId: Id; itemId: Id }>
    ) => {
      const { boardId, columnId, itemId } = action.payload;
      const column = state[columnId];
      const itemIds = (column[ITEM_IDS] || []).filter((id) => id !== itemId);
      column[ITEM_IDS] = itemIds;
      setColumnItemIds(boardId, columnId, itemIds);
    },

    resetColumns: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = columnsSlice;
