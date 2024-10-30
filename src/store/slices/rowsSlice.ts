import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  debouncedUpdateRow,
  removeRow,
  saveRowItemIds,
  updateRow,
} from 'src/firebase';
import type { Id, Row, RowItemIds, Rows } from 'src/types';

export const initialState: Rows = {};

export const rowsSlice = createSlice({
  name: 'rows',
  initialState,

  reducers: {
    updateRow: (
      state,
      action: PayloadAction<{
        listId?: Id;
        row: Partial<Row>;
        rowId: Id;
        debounce?: boolean;
        skipSave?: boolean;
      }>,
    ) => {
      const { listId, row, rowId, debounce, skipSave } = action.payload;
      state[rowId] = state[rowId] || {};
      Object.assign(state[rowId], row);

      if (!row.itemIds) {
        delete state[rowId].itemIds;
      }

      if (!skipSave && listId) {
        if (debounce) {
          debouncedUpdateRow(listId, rowId, row);
        } else {
          updateRow(listId, rowId, row);
        }
      }
    },

    renameRow: (
      state,
      action: PayloadAction<{
        listId: Id;
        rowId: Id;
        rowName: Row['name'];
        debounce?: boolean;
        userId: Row['updatedBy'];
      }>,
    ) => {
      const { listId, rowId, rowName, debounce, userId } = action.payload;
      state[rowId] = state[rowId] || {};
      const row = {
        name: rowName,
        updatedAt: Date.now(),
        updatedBy: userId,
      };
      Object.assign(state[rowId], row);

      if (debounce) {
        debouncedUpdateRow(listId, rowId, row);
      } else {
        updateRow(listId, rowId, row);
      }
    },

    removeRow: (
      state,
      action: PayloadAction<{ listId: Id; rowId: Id; skipSave?: boolean }>,
    ) => {
      const { listId, rowId, skipSave } = action.payload;
      delete state[rowId];

      if (!skipSave) {
        removeRow(listId, rowId);
      }
    },

    addRowItemId: (
      state,
      action: PayloadAction<{ listId: Id; rowId: Id; itemId: Id }>,
    ) => {
      const { listId, rowId, itemId } = action.payload;
      const row = state[rowId];

      row.itemIds = row.itemIds || [];
      row.itemIds.push(itemId);

      saveRowItemIds(listId, { [rowId]: row.itemIds });
    },

    removeRowItemId: (
      state,
      action: PayloadAction<{ listId: Id; rowId: Id; itemId: Id }>,
    ) => {
      const { listId, rowId, itemId } = action.payload;
      const row = state[rowId];

      if (row) {
        const itemIds = (row.itemIds || []).filter((id) => id !== itemId);
        row.itemIds = itemIds;
        saveRowItemIds(listId, { [rowId]: itemIds });
      }
    },

    setRowItemIds: (
      state,
      action: PayloadAction<{
        listId: Id;
        rowItemIds: RowItemIds;
      }>,
    ) => {
      const { listId, rowItemIds } = action.payload;

      Object.entries(rowItemIds).forEach(([rowId, itemIds]) => {
        state[rowId].itemIds = itemIds;
      });

      saveRowItemIds(listId, rowItemIds);
    },

    resetRows: () => initialState,
  },
});
