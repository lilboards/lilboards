import { fireEvent, screen } from '@testing-library/react';

import { firebaseAnalytics } from '../../firebase';
import {
  getStoreState,
  renderWithContext,
  updateStore,
} from '../../utils/test';
import Present from './Present';

jest.mock('../../firebase', () => ({
  firebaseAnalytics: {
    logEvent: jest.fn(),
  },
}));

it('toggles present mode', () => {
  updateStore.withUser();
  renderWithContext(<Present />);
  expect(getStoreState().user.presenting).toEqual(false);
  fireEvent.click(screen.getByLabelText('Hide Likes'));
  expect(getStoreState().user.presenting).toBe(true);
  expect(firebaseAnalytics.logEvent).toBeCalledTimes(1);
  expect(firebaseAnalytics.logEvent).toBeCalledWith('user_presenting', {
    checked: true,
  });
});
