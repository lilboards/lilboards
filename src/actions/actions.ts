import {
  boardsSlice,
  columnsSlice,
  itemsSlice,
  likesSlice,
  userSlice,
} from '../slices';

export const actions = {
  ...boardsSlice.actions,
  ...columnsSlice.actions,
  ...itemsSlice.actions,
  ...likesSlice.actions,
  ...userSlice.actions,
};

export const resetActions = [
  actions.resetBoards,
  actions.resetColumns,
  actions.resetItems,
  actions.resetLikes,
  actions.resetUser,
];
