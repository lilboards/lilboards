/* istanbul ignore file */
import { render as reactTestingLibraryRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';

import store from '../store';
import actions, { resetActions } from '../actions';

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
      id: 'board1',
      name: 'Board 1',
      updated: 0,
    };
    store.dispatch(actions.loadBoard(board));
    return board;
  },

  withBoardAndColumns() {
    const board = this.withBoard();
    const columns = {
      column1: {
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
      email: 'user@example.com',
      id: 'user1',
    };
    store.dispatch(actions.setUser(user));
    return user;
  },
};

export const getStoreState = () => store.getState();
