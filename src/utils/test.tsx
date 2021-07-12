import { render as reactTestingLibraryRender } from '@testing-library/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Provider } from 'react-redux';

import actions, { resetActions } from '../actions';
import { ITEM_IDS } from '../constants';
import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
  DATE_NOW as dateNow,
  ITEM_TEST_ID as itemId,
  USER_TEST_EMAIL as userEmail,
  USER_TEST_ID as userId,
} from '../constants/test';
import store from '../store';

import type { ReactNode } from 'react';
import type { Columns, Item } from '../types';

/* istanbul ignore next */
function noop() {}

function StoreWrapper(props: { children?: ReactNode }) {
  return (
    <Provider store={store}>
      <DragDropContext onDragEnd={noop}>{props.children}</DragDropContext>
    </Provider>
  );
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
      createdAt: dateNow,
      createdBy: userId,
      id: boardId,
      name: 'Board One',
    };
    store.dispatch(actions.loadBoard(board));
    return board;
  },

  withColumn() {
    const column = {
      createdAt: dateNow,
      createdBy: userId,
      name: 'Column One',
      [ITEM_IDS]: [itemId],
    };
    const id = columnId;
    const payload = { [id]: column };
    store.dispatch(actions.loadColumns(payload));
    return { ...column, id };
  },

  withColumns(payload: Columns) {
    store.dispatch(actions.loadColumns(payload));
  },

  withItem() {
    const item: Item = {
      createdAt: dateNow,
      createdBy: userId,
      text: 'Item One',
    };
    const payload = { item, itemId };
    store.dispatch(actions.updateItem(payload));
    return { ...item, id: itemId };
  },

  withLike() {
    const payload = { boardId, itemId, userId };
    store.dispatch(actions.likeItem(payload));
  },

  withUser(email = true) {
    const user = {
      email: email ? userEmail : '',
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
