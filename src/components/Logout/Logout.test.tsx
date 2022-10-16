import { waitFor } from '@testing-library/react';

import { logEvent, signOut } from '../../firebase';
import {
  renderWithContext,
  router,
  store,
  updateStore,
} from '../../utils/test';
import Logout from './Logout';

jest.mock('../../firebase', () => ({
  logEvent: jest.fn(),
  signOut: jest.fn(),
}));

beforeEach(() => {
  (signOut as jest.Mock).mockResolvedValueOnce(undefined);
});

it('signs user out', async () => {
  updateStore.withUser();
  const { baseElement } = renderWithContext(<Logout />);

  await waitFor(() => expect(router.state.location.pathname).toBe('/login'));
  expect(signOut).toBeCalledTimes(1);
  expect(store.getState().user.id).toBe('');

  expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toBeCalledWith('logout');

  // eslint-disable-next-line testing-library/no-node-access
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});
