import { createSlice } from '@reduxjs/toolkit';

import { LIKES } from '../constants';
import { likeItem, removeLikesItem, unlikeItem } from '../firebase';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Id, Likes } from '../types';

export const initialState: Likes = {
  items: {},
};

export const name = LIKES;

const likesSlice = createSlice({
  name,
  initialState,

  reducers: {
    likeItem: (
      state,
      action: PayloadAction<{ boardId: Id; itemId: Id; userId: Id }>
    ) => {
      const { boardId, itemId, userId } = action.payload;
      state.items[itemId] = state.items[itemId] || {};
      state.items[itemId][userId] = true;
      likeItem(boardId, itemId, userId);
    },

    unlikeItem: (
      state,
      action: PayloadAction<{ boardId: Id; itemId: Id; userId: Id }>
    ) => {
      const { boardId, itemId, userId } = action.payload;
      if (state.items[itemId]) {
        delete state.items[itemId][userId];
        unlikeItem(boardId, itemId, userId);
      }
    },

    loadLikes: (state, action: PayloadAction<Likes>) => {
      return action.payload;
    },

    removeLikesItem: (
      state,
      action: PayloadAction<{ boardId: Id; itemId: Id }>
    ) => {
      const { boardId, itemId } = action.payload;
      delete state.items[itemId];
      removeLikesItem(boardId, itemId);
    },

    resetLikes: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = likesSlice;
