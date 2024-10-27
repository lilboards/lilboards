import { waitFor } from '@testing-library/react';

import {
  renderWithProviders,
  router,
  store,
  updateStore,
} from '../../../test/utils';
import { logEvent, signOut } from '../../firebase';
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
  expect(signOut).toHaveBeenCalledTimes(1);
  expect(store.getState().user.id).toBe('');

  expect(logEvent).toHaveBeenCalledTimes(1);
  expect(logEvent).toHaveBeenCalledWith('logout');

  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});
