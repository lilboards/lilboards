import { DragDropContext } from '@hello-pangea/dnd';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { DatabaseKey } from 'src/constants';
import { actions, resetActions, store } from 'src/store';
import type { Board, Columns, Item, List, Rows, User } from 'src/types';
import { noop } from 'src/utils';

import {
  boardId,
  columnId,
  dateNow,
  email as userEmail,
  itemId,
  listId,
  listItemId,
  rowId,
  userId,
} from './constants';

export let router: ReturnType<typeof createMemoryRouter>;

export function wrapper(props: { children?: React.ReactNode }) {
  const routes = [
    {
      path: '/',
      element: (
        <DragDropContext onDragEnd={noop}>{props.children}</DragDropContext>
      ),
    },
    {
      path: '*',
      element: <></>,
    },
  ];

  router = createMemoryRouter(routes);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

/**
 * @see {@link https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function}
 */
export function renderWithProviders(ui: React.ReactElement) {
  return render(ui, { wrapper });
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
      [DatabaseKey.itemIds]: [itemId],
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

  withItem(
    item: Partial<Item> = {
      createdAt: dateNow,
      createdBy: userId,
      text: 'Item One',
    },
  ) {
    item = {
      createdAt: dateNow,
      createdBy: userId,
      text: 'Item One',
      ...item,
    };
    const payload = {
      item,
      itemId,
    };
    store.dispatch(actions.updateItem(payload));

    return {
      ...(item as Item),
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

  withList(list?: Partial<List>) {
    const payload = {
      list: {
        createdAt: dateNow,
        createdBy: userId,
        name: 'List One',
        ...list,
      },
      listId,
    };
    store.dispatch(actions.loadList(payload));

    return {
      ...payload.list,
      id: listId,
    };
  },

  withRow() {
    const row = {
      createdAt: dateNow,
      createdBy: userId,
      name: 'Row One',
      [DatabaseKey.itemIds]: [listItemId],
    };

    const id = rowId;
    const payload = {
      row,
      rowId,
      skipSave: true,
    };
    store.dispatch(actions.updateRow(payload));

    return {
      ...row,
      id,
    };
  },

  withRows(rows: Rows) {
    Object.entries(rows).forEach(([rowId, row]) => {
      const payload = {
        row,
        rowId,
        skipSave: true,
      };
      store.dispatch(actions.updateRow(payload));
    });
  },

  withUser(email = true, override?: Partial<User>) {
    const user: Partial<User> = {
      id: userId,
    };

    if (email) {
      user.email = userEmail;
      user.emailVerified = true;
    }

    store.dispatch(
      actions.setUser({
        ...user,
        ...override,
      }),
    );

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
