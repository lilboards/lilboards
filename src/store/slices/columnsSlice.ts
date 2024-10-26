import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  debouncedUpdateColumn,
  removeColumn,
  saveColumnItemIds,
  updateColumn,
} from 'src/firebase';
import type { Column, ColumnItemIds, Columns, Id } from 'src/types';

export const initialState: Columns = {};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,

  reducers: {
    updateColumn: (
      state,
      action: PayloadAction<{
        boardId?: Id;
        column: Partial<Column>;
        columnId: Id;
        debounce?: boolean;
        skipSave?: boolean;
      }>,
    ) => {
      const { boardId, column, columnId, debounce, skipSave } = action.payload;
      state[columnId] = state[columnId] || {};
      Object.assign(state[columnId], column);

      if (!column.itemIds) {
        delete state[columnId].itemIds;
      }

      if (!skipSave && boardId) {
        if (debounce) {
          debouncedUpdateColumn(boardId, columnId, column);
        } else {
          updateColumn(boardId, columnId, column);
        }
      }
    },

    renameColumn: (
      state,
      action: PayloadAction<{
        boardId: Id;
        columnId: Id;
        columnName: Column['name'];
        debounce?: boolean;
        userId: Column['updatedBy'];
      }>,
    ) => {
      const { boardId, columnId, columnName, debounce, userId } =
        action.payload;
      state[columnId] = state[columnId] || {};
      const column = {
        name: columnName,
        updatedAt: Date.now(),
        updatedBy: userId,
      };
      Object.assign(state[columnId], column);

      if (debounce) {
        debouncedUpdateColumn(boardId, columnId, column);
      } else {
        updateColumn(boardId, columnId, column);
      }
    },

    removeColumn: (
      state,
      action: PayloadAction<{ boardId: Id; columnId: Id; skipSave?: boolean }>,
    ) => {
      const { boardId, columnId, skipSave } = action.payload;
      delete state[columnId];
      if (!skipSave) {
        removeColumn(boardId, columnId);
      }
    },

    addColumnItemId: (
      state,
      action: PayloadAction<{ boardId: Id; columnId: Id; itemId: Id }>,
    ) => {
      const { boardId, columnId, itemId } = action.payload;
      const column = state[columnId];
      column.itemIds = column.itemIds || [];
      column.itemIds.push(itemId);
      saveColumnItemIds(boardId, { [columnId]: column.itemIds });
    },

    removeColumnItemId: (
      state,
      action: PayloadAction<{ boardId: Id; columnId: Id; itemId: Id }>,
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
      }>,
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
