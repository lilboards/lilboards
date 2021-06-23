import { actions as boardsActions } from '../store/boardsSlice';
import { actions as columnsActions } from '../store/columnsSlice';
import { actions as itemsActions } from '../store/itemsSlice';
import { actions as userActions } from '../store/userSlice';

const actions = {
  ...boardsActions,
  ...columnsActions,
  ...itemsActions,
  ...userActions,
};

export const resetActions = [
  actions.resetBoards,
  actions.resetColumns,
  actions.resetItems,
  actions.resetUser,
];

export default actions;
