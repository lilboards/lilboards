import { createSlice } from '@reduxjs/toolkit';

import { ITEMS } from '../constants';
import { getItemRef, removeItem } from '../firebase';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Id } from '../types';

type Item = {
  created: number;
  text: string;
  updated: number;
};

type Items = {
  [itemId: string]: Item;
};

export const initialState: Items = {};

export const name = ITEMS;

const slice = createSlice({
  name,
  initialState,

  reducers: {
    addItem: (state, action: PayloadAction<{ boardId: Id; itemId: Id }>) => {
      const now = Date.now();
      const item: Item = {
        created: now,
        text: '',
        updated: now,
      };
      const { boardId, itemId } = action.payload;
      getItemRef(boardId, itemId).set(item);
      state[itemId] = item;
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
