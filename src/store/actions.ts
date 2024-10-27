import {
  boardsSlice,
  columnsSlice,
  itemsSlice,
  likesSlice,
  listsSlice,
  userSlice,
} from '../store/slices';

export const actions = {
  ...boardsSlice.actions,
  ...columnsSlice.actions,
  ...itemsSlice.actions,
  ...likesSlice.actions,
  ...listsSlice.actions,
  ...userSlice.actions,
};

export const resetActions = [
  actions.resetBoards,
  actions.resetColumns,
  actions.resetItems,
  actions.resetLikes,
  actions.resetLists,
  actions.resetUser,
];
