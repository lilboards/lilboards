import { createSlice } from '@reduxjs/toolkit';

import { ITEMS } from '../constants';
import { removeItem, updateItem } from '../firebase';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Id, Item, Items } from '../types';

export const initialState: Items = {};

export const name = ITEMS;

const slice = createSlice({
  name,
  initialState,

  reducers: {
    updateItem: (
      state,
      action: PayloadAction<{
        boardId?: Id;
        item: Partial<Item>;
        itemId: Id;
        skipSave?: boolean;
      }>
    ) => {
      const { boardId, itemId, item, skipSave } = action.payload;
      state[itemId] = state[itemId] || {};
      Object.assign(state[itemId], item);

      if (!skipSave && boardId) {
        updateItem(boardId, itemId, item);
      }
    },

    likeItem: (state, action: PayloadAction<{ itemId: Id; userId: Id }>) => {
      const { itemId, userId } = action.payload;
      if (userId) {
        const item = state[itemId];
        if (item) {
          item.likes = item.likes || {};
          item.likes[userId] = true;
        }
      }
    },

    unlikeItem: (state, action: PayloadAction<{ itemId: Id; userId: Id }>) => {
      const { itemId, userId } = action.payload;
      if (userId) {
        const item = state[itemId];
        if (item && item.likes) {
          delete item.likes[userId];
        }
      }
    },

    removeItem: (
      state,
      action: PayloadAction<{ boardId?: Id; itemId: Id; skipSave?: boolean }>
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

export const { actions, reducer } = slice;
