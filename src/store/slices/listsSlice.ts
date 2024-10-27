import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  debouncedSaveListData,
  removeList,
  removeUserList,
  saveListData,
} from 'src/firebase';
import type { Id, List, Lists } from 'src/types';

export const initialState: Lists = {};

export const listsSlice = createSlice({
  name: 'lists',
  initialState,

  reducers: {
    updateList: (
      state,
      action: PayloadAction<{
        list: Partial<List>;
        listId: Id;
        debounce?: boolean;
        skipSave?: boolean;
      }>,
    ) => {
      const { list, listId, debounce, skipSave } = action.payload;
      state[listId] = state[listId] || {};
      Object.assign(state[listId], list);

      if (!skipSave) {
        if (debounce) {
          debouncedSaveListData(listId, list);
        } else {
          saveListData(listId, list);
        }
      }
    },

    deleteList: (
      state,
      action: PayloadAction<{ listId: Id; userId: Id; skipSave?: boolean }>,
    ) => {
      const { listId, skipSave, userId } = action.payload;
      delete state[listId];
      if (!skipSave) {
        removeList(listId);
        removeUserList(userId, listId);
      }
    },

    loadList: (state, action: PayloadAction<{ list: List; listId: Id }>) => {
      const { list, listId } = action.payload;
      state[listId] = state[listId] || {};
      Object.assign(state[listId], list);
    },

    resetLists: () => initialState,
  },
});
