import {
  boardsSlice,
  columnsSlice,
  itemsSlice,
  likesSlice,
  listItemsSlice,
  listsSlice,
  rowsSlice,
  userSlice,
} from '../store/slices';

export const actions = {
  ...boardsSlice.actions,
  ...columnsSlice.actions,
  ...itemsSlice.actions,
  ...likesSlice.actions,
  ...listItemsSlice.actions,
  ...listsSlice.actions,
  ...rowsSlice.actions,
  ...userSlice.actions,
};

export const resetActions = [
  actions.resetBoards,
  actions.resetColumns,
  actions.resetItems,
  actions.resetLikes,
  actions.resetListItems,
  actions.resetLists,
  actions.resetRows,
  actions.resetUser,
];
