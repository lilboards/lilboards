import { waitFor } from '@testing-library/react';

import { logEvent, signOut } from '../../firebase';
import {
  renderWithProviders,
  router,
  store,
  updateStore,
} from '../../utils/test';
import Logout from './Logout';

jest.mock('../../firebase', () => ({
  logEvent: jest.fn(),
  signOut: jest.fn(),
}));

const mockedSignOut = jest.mocked(signOut);

beforeEach(() => {
  mockedSignOut.mockResolvedValueOnce(undefined);
});

it('signs user out', async () => {
  updateStore.withUser();
  const { baseElement } = renderWithProviders(<Logout />);

  await waitFor(() => expect(router.state.location.pathname).toBe('/login'));
  expect(signOut).toBeCalledTimes(1);
  expect(store.getState().user.id).toBe('');

  expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toBeCalledWith('logout');

  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});
