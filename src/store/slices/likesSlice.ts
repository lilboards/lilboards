import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  likeItem,
  removeLikesItem,
  setLikesItem,
  unlikeItem,
} from 'src/firebase';
import type { Id, Likes, LikesItem } from 'src/types';

export const initialState: Likes = {
  items: {},
};

export const likesSlice = createSlice({
  name: 'likes',
  initialState,

  reducers: {
    likeItem: (
      state,
      action: PayloadAction<{ boardId: Id; itemId: Id; userId: Id }>,
    ) => {
      const { boardId, itemId, userId } = action.payload;
      state.items[itemId] = state.items[itemId] || {};
      state.items[itemId][userId] = true;
      likeItem(boardId, itemId, userId);
    },

    unlikeItem: (
      state,
      action: PayloadAction<{ boardId: Id; itemId: Id; userId: Id }>,
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
      action: PayloadAction<{ boardId: Id; itemId: Id }>,
    ) => {
      const { boardId, itemId } = action.payload;
      delete state.items[itemId];
      removeLikesItem(boardId, itemId);
    },

    resetLikes: () => {
      return initialState;
    },

    setLikesItem: (
      state,
      action: PayloadAction<{ boardId: Id; itemId: Id; likes: LikesItem }>,
    ) => {
      const { boardId, itemId, likes } = action.payload;
      state.items[itemId] = likes;
      setLikesItem(boardId, itemId, likes);
    },
  },
});
