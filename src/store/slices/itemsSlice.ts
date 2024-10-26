import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { removeItem, updateItem } from 'src/firebase';
import type { Id, Item, Items } from 'src/types';

export const initialState: Items = {};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,

  reducers: {
    updateItem: (
      state,
      action: PayloadAction<{
        boardId?: Id;
        item: Partial<Item>;
        itemId: Id;
        skipSave?: boolean;
      }>,
    ) => {
      const { boardId, itemId, item, skipSave } = action.payload;
      state[itemId] = state[itemId] || {};
      Object.assign(state[itemId], item);

      if (!skipSave && boardId) {
        updateItem(boardId, itemId, item);
      }
    },

    removeItem: (
      state,
      action: PayloadAction<{ boardId?: Id; itemId: Id; skipSave?: boolean }>,
    ) => {
      const { boardId, itemId, skipSave } = action.payload;
      delete state[itemId];

      if (!skipSave && boardId) {
        removeItem(boardId, itemId);
      }
    },

    resetItems: () => {
      return initialState;
    },
  },
});
