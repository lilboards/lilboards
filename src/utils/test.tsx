import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';
import { render as reactTestingLibraryRender } from '@testing-library/react';
import type { ReactNode } from 'react';
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
import type { Board, Columns, Item, User } from '../types';

/* istanbul ignore next */
function noop() {}

export const history = createHistory(createMemorySource('/'));

function ContextWrapper(props: { children?: ReactNode }) {
  return (
    <Provider store={store}>
      <LocationProvider history={history}>
        <DragDropContext onDragEnd={noop}>{props.children}</DragDropContext>
      </LocationProvider>
    </Provider>
  );
}

/**
 * @see {@link https://redux.js.org/recipes/writing-tests#components}
 */
export function renderWithContext(ui: JSX.Element) {
  return reactTestingLibraryRender(ui, { wrapper: ContextWrapper });
}

export function resetStore() {
  resetActions.forEach((resetAction) => store.dispatch(resetAction()));
}

export const updateStore = {
  withBoard(board?: Partial<Board>) {
    const payload = {
      board: {
        createdAt: dateNow,
        createdBy: userId,
        name: 'Board One',
        ...board,
      },
      boardId,
    };
    store.dispatch(actions.loadBoard(payload));
    return {
      ...payload.board,
      id: boardId,
    };
  },

  withColumn() {
    const column = {
      createdAt: dateNow,
      createdBy: userId,
      name: 'Column One',
      [ITEM_IDS]: [itemId],
    };
    const id = columnId;
    const payload = {
      column,
      columnId,
      skipSave: true,
    };
    store.dispatch(actions.updateColumn(payload));
    return {
      ...column,
      id,
    };
  },

  withColumns(columns: Columns) {
    Object.entries(columns).forEach(([columnId, column]) => {
      const payload = {
        column,
        columnId,
        skipSave: true,
      };
      store.dispatch(actions.updateColumn(payload));
    });
  },

  withItem() {
    const item: Item = {
      createdAt: dateNow,
      createdBy: userId,
      text: 'Item One',
    };
    const payload = {
      item,
      itemId,
    };
    store.dispatch(actions.updateItem(payload));
    return {
      ...item,
      id: itemId,
    };
  },

  withLike() {
    const payload = {
      boardId,
      itemId,
      userId,
    };
    store.dispatch(actions.likeItem(payload));
  },

  withUser(email = true) {
    const user: Partial<User> = {
      id: userId,
    };
    if (email) {
      user.email = userEmail;
      user.emailVerified = true;
    }
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

export { store };
