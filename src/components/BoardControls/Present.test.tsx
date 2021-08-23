import { fireEvent, screen } from '@testing-library/react';
import {
  renderWithContext,
  getStoreState,
  updateStore,
} from '../../utils/test';
import { firebaseAnalytics } from '../../firebase';
import Present from './Present';

jest.mock('../../firebase', () => ({
  firebaseAnalytics: {
    logEvent: jest.fn(),
  },
}));

it('toggles "Present" mode', () => {
  updateStore.withUser();
  renderWithContext(<Present />);
  expect(getStoreState().user.presenting).toEqual(false);
  fireEvent.click(screen.getByLabelText('Present'));
  expect(getStoreState().user.presenting).toBe(true);
  expect(firebaseAnalytics.logEvent).toBeCalledTimes(1);
  expect(firebaseAnalytics.logEvent).toBeCalledWith('user_presenting', {
    checked: true,
  });
});
