import { waitFor } from '@testing-library/react';
import { logEvent, signOut } from 'src/firebase';
import { renderWithProviders, router, store, updateStore } from 'test/utils';
import { beforeEach, expect, it, vi } from 'vitest';

import Logout from './Logout';

vi.mock('src/firebase');

const mockedSignOut = vi.mocked(signOut);

beforeEach(() => {
  mockedSignOut.mockResolvedValueOnce(undefined);
});

it('signs user out', async () => {
  updateStore.withUser();
  const { baseElement } = renderWithProviders(<Logout />);

  await waitFor(() => {
    expect(router.state.location.pathname).toBe('/login');
  });
  expect(signOut).toHaveBeenCalledTimes(1);
  expect(store.getState().user.id).toBe('');

  expect(logEvent).toHaveBeenCalledTimes(1);
  expect(logEvent).toHaveBeenCalledWith('logout');

  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});
