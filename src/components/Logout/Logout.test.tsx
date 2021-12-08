import { screen } from '@testing-library/react';

import { logEvent, signOut } from '../../firebase';
import { renderWithContext, store, updateStore } from '../../utils/test';
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

  expect(signOut).toBeCalledTimes(1);
  expect(store.getState().user.id).toBe('');

  await screen.findAllByText('');
  expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toBeCalledWith('logout');
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});
