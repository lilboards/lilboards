import { fireEvent, screen } from '@testing-library/react';

import { logEvent } from '../../firebase';
import {
  getStoreState,
  renderWithContext,
  updateStore,
} from '../../utils/test';
import Present from './Present';

jest.mock('../../firebase', () => ({
  logEvent: jest.fn(),
}));

it('toggles present mode', () => {
  updateStore.withUser();
  renderWithContext(<Present />);
  expect(getStoreState().user.presenting).toEqual(false);
  fireEvent.click(screen.getByLabelText('Hide Likes'));
  expect(getStoreState().user.presenting).toBe(true);
  expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toBeCalledWith('user_presenting', {
    checked: true,
  });
});
