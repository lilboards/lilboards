import { fireEvent, screen } from '@testing-library/react';

import { logEvent } from '../../firebase';
import { renderWithContext, store, updateStore } from '../../utils/test';
import Present from './Present';

jest.mock('../../firebase', () => ({
  logEvent: jest.fn(),
}));

it('toggles present mode', () => {
  updateStore.withUser();
  renderWithContext(<Present />);
  expect(store.getState().user.presenting).toEqual(false);
  fireEvent.click(screen.getByLabelText('Hide Likes'));
  expect(store.getState().user.presenting).toBe(true);
  expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toBeCalledWith('user_presenting', {
    checked: true,
  });
});
