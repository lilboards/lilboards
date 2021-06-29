/* istanbul ignore file */
import { render as reactTestingLibraryRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';

import actions, { resetActions } from '../actions';
import { ITEM_IDS } from '../constants';
import {
  BOARD_TEST_ID,
  COLUMN_TEST_ID,
  ITEM_TEST_ID,
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
      created: Date.now(),
      id: BOARD_TEST_ID,
      name: 'Board 1',
      updated: Date.now(),
    };
    store.dispatch(actions.loadBoard(board));
    return board;
  },

  withColumn() {
    const column = {
      created: Date.now(),
      name: 'Column 1',
      [ITEM_IDS]: [ITEM_TEST_ID],
      updated: Date.now(),
    };
    const id = COLUMN_TEST_ID;
    const payload = { [id]: column };
    store.dispatch(actions.loadColumns(payload));
    return { ...column, id };
  },

  withItem() {
    const item = {
      created: Date.now(),
      text: 'Item 1',
      updated: Date.now(),
    };
    const id = ITEM_TEST_ID;
    const payload = { [id]: item };
    store.dispatch(actions.loadItems(payload));
    return { ...item, id };
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
      columnId: COLUMN_TEST_ID,
    };
    store.dispatch(actions.toggleUserEditing(userEditing));
    return userEditing;
  },
};

export const getStoreState = () => store.getState();
