import { createSlice } from '@reduxjs/toolkit';

import { ITEMS } from '../constants';
import { removeItem } from '../firebase';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Id, Item } from '../types';

type Items = {
  [itemId: string]: Item;
};

export const initialState: Items = {};

export const name = ITEMS;

const slice = createSlice({
  name,
  initialState,

  reducers: {
    updateItem: (
      state,
      action: PayloadAction<Partial<Item> & { itemId: Id }>
    ) => {
      const { itemId, ...item } = action.payload;
      state[itemId] = state[itemId] || {};
      Object.assign(state[itemId], item);
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
