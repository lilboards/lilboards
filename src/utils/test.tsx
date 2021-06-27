/* istanbul ignore file */
import { render as reactTestingLibraryRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';

import actions, { resetActions } from '../actions';
import {
  BOARD_TEST_ID,
  COLUMN_TEST_ID,
  USER_TEST_EMAIL,
  USER_TEST_ID,
} from '../constants/test';
import store from '../store';

type Props = {
  children?: ReactNode;
};

function StoreWrapper(props: Props) {
  return <Provider store={store}>{props.children}</Provider>;
}

/**
 * @see {@link https://redux.js.org/recipes/writing-tests#components}
 */
export function renderWithStore(ui: JSX.Element) {
  return reactTestingLibraryRender(ui, { wrapper: StoreWrapper });
}

export function resetStore() {
  resetActions.forEach((resetAction) => store.dispatch(resetAction()));
}

export const updateStore = {
  withBoard() {
    const board = {
      created: 0,
      id: BOARD_TEST_ID,
      name: 'Board 1',
      updated: 0,
    };
    store.dispatch(actions.loadBoard(board));
    return board;
  },

  withBoardAndColumns() {
    const board = this.withBoard();
    const columns = {
      [COLUMN_TEST_ID]: {
        created: 0,
        name: 'Column 1',
        updated: 0,
      },
    };
    store.dispatch(actions.loadColumns(columns));
    return { board, columns };
  },

  withUser() {
    const user = {
      email: USER_TEST_EMAIL,
      id: USER_TEST_ID,
    };
    store.dispatch(actions.setUser(user));
    return user;
  },

  withUserEditing() {
    const userEditing = {
      boardId: BOARD_TEST_ID,
    };
    store.dispatch(actions.toggleUserEditing(userEditing));
    return userEditing;
  },
};

export const getStoreState = () => store.getState();
