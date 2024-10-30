import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { removeListItem, updateListItem } from 'src/firebase';
import type { Id, ListItem, ListItems } from 'src/types';

export const initialState: ListItems = {};

export const listItemsSlice = createSlice({
  name: 'listItems',
  initialState,

  reducers: {
    updateListItem: (
      state,
      action: PayloadAction<{
        listId?: Id;
        item: Partial<ListItem>;
        itemId: Id;
        skipSave?: boolean;
      }>,
    ) => {
      const { listId, itemId, item, skipSave } = action.payload;
      state[itemId] = state[itemId] || {};
      Object.assign(state[itemId], item);

      if (!skipSave && listId) {
        updateListItem(listId, itemId, item);
      }
    },

    removeListItem: (
      state,
      action: PayloadAction<{ listId?: Id; itemId: Id; skipSave?: boolean }>,
    ) => {
      const { listId, itemId, skipSave } = action.payload;
      delete state[itemId];

      if (!skipSave && listId) {
        removeListItem(listId, itemId);
      }
    },

    resetListItems: () => initialState,
  },
});
