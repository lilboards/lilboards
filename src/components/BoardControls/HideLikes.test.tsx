import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders, store, updateStore } from '../../../test/utils';
import { logEvent } from '../../firebase';
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
  expect(logEvent).toHaveBeenCalledTimes(1);
  expect(logEvent).toHaveBeenCalledWith('hide_likes', { checked: true });
});
