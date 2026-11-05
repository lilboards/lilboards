import { fireEvent, screen } from '@testing-library/react';
import { logEvent } from 'src/firebase';
import { renderWithProviders, store, updateStore } from 'test/utils';
import { expect, it, vi } from 'vitest';

import HideLikes from './HideLikes';

vi.mock('src/firebase');

it('toggles hide likes', () => {
  updateStore.withUser();
  renderWithProviders(<HideLikes />);
  expect(store.getState().user.hideLikes).toEqual(false);
  fireEvent.click(screen.getByLabelText('Hide Likes'));
  expect(store.getState().user.hideLikes).toBe(true);
  expect(logEvent).toHaveBeenCalledTimes(1);
  expect(logEvent).toHaveBeenCalledWith('hide_likes', { checked: true });
});
