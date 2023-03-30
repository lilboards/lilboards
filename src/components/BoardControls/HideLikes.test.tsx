import { fireEvent, screen } from '@testing-library/react';

import { logEvent } from '../../firebase';
import { renderWithProviders, store, updateStore } from '../../utils/test';
import HideLikes from './HideLikes';

jest.mock('../../firebase', () => ({
  logEvent: jest.fn(),
}));

it('toggles hide likes', () => {
  updateStore.withUser();
  renderWithProviders(<HideLikes />);
  expect(store.getState().user.hideLikes).toEqual(false);
  fireEvent.click(screen.getByLabelText('Hide Likes'));
  expect(store.getState().user.hideLikes).toBe(true);
  expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toBeCalledWith('hide_likes', { checked: true });
});
