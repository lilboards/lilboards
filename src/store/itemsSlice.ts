import { createSlice } from '@reduxjs/toolkit';

import { ITEMS } from '../constants';
import { removeItem } from '../firebase';

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
      action: PayloadAction<{ item: Partial<Item>; itemId: Id }>
    ) => {
      const { itemId, item } = action.payload;
      state[itemId] = state[itemId] || {};
      Object.assign(state[itemId], item);
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

    loadItems: (state, action: PayloadAction<Items>) => {
      return action.payload;
    },

    removeItem: (state, action: PayloadAction<{ boardId: Id; itemId: Id }>) => {
      const { boardId, itemId } = action.payload;
      removeItem(boardId, itemId);
      delete state[itemId];
    },

    resetItems: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = slice;
