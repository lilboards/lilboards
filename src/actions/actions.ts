import { actions as boardsActions } from '../slices/boardsSlice';
import { actions as columnsActions } from '../slices/columnsSlice';
import { actions as itemsActions } from '../slices/itemsSlice';
import { actions as likesActions } from '../slices/likesSlice';
import { actions as userActions } from '../slices/userSlice';

export const actions = {
  ...boardsActions,
  ...columnsActions,
  ...itemsActions,
  ...likesActions,
  ...userActions,
};

export const resetActions = [
  actions.resetBoards,
  actions.resetColumns,
  actions.resetItems,
  actions.resetLikes,
  actions.resetUser,
];
