import { actions as boardsActions } from '../store/boardsSlice';
import { actions as userActions } from '../store/userSlice';

const actions = {
  ...boardsActions,
  ...userActions,
};

export const resetActions = [actions.resetBoards, actions.resetUser];

export default actions;
