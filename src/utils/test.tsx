import { render as reactTestingLibraryRender } from '@testing-library/react';
import { Provider } from 'react-redux';

import actions, { resetActions } from '../actions';
import { ITEM_IDS } from '../constants';
import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
  ITEM_TEST_ID as itemId,
  USER_TEST_EMAIL as userEmail,
  USER_TEST_ID as userId,
} from '../constants/test';
import store from '../store';

import type { ReactNode } from 'react';

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
      id: boardId,
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
      [ITEM_IDS]: [itemId],
      updated: Date.now(),
    };
    const id = columnId;
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
    const id = itemId;
    const payload = { [id]: item };
    store.dispatch(actions.loadItems(payload));
    return { ...item, id };
  },

  withUser() {
    const user = {
      email: userEmail,
      id: userId,
    };
    store.dispatch(actions.setUser(user));
    return user;
  },

  withUserEditing() {
    const userEditing = {
      boardId,
      columnId,
      itemId,
    };
    store.dispatch(actions.setUserEditing(userEditing));
    return userEditing;
  },
};

export const getStoreState = () => store.getState();
