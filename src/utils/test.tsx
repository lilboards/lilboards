import { render as reactTestingLibraryRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';

import store from '../store';
import { actions as userActions } from '../store/userSlice';

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
  store.dispatch(userActions.resetUser());
}

export const updateStore = {
  withUser() {
    store.dispatch(userActions.setUser('user_id'));
  },
};

export const getStoreState = () => store.getState();
