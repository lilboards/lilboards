import { actions as boardsActions } from '../store/boardsSlice';
import { actions as columnsActions } from '../store/columnsSlice';
import { actions as userActions } from '../store/userSlice';

const actions = {
  ...boardsActions,
  ...columnsActions,
  ...userActions,
};

export const resetActions = [
  actions.resetBoards,
  actions.resetColumns,
  actions.resetUser,
];

export default actions;
