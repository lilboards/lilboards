/* istanbul ignore file */
import { createSlice } from '@reduxjs/toolkit';

import { ITEMS } from '../constants';
import { getItemsRef } from '../firebase';

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
    addItem: (state, action: PayloadAction<Id>) => {
      const now = Date.now();
      const item: Item = {
        created: now,
        text: '',
        updated: now,
      };

      const boardId = action.payload;
      const itemsRef = getItemsRef(boardId);
      const itemRef = itemsRef.push();
      const itemId = itemRef.key as Id;
      itemRef.set(item);

      state[itemId] = item;
    },

    resetItems: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = slice;
