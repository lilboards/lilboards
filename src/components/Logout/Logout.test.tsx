import { screen } from '@testing-library/react';
import { firebaseAuth } from '../../firebase';
import { getStoreState, renderWithStore, updateStore } from '../../utils/test';
import Logout from './Logout';

jest.mock('../../firebase', () => ({
  firebaseAnalytics: {
    logEvent: jest.fn(),
  },
  firebaseAuth: {
    signOut: jest.fn(),
  },
}));

beforeEach(() => {
  (firebaseAuth.signOut as jest.Mock).mockResolvedValueOnce(undefined);
});

it('signs user out', async () => {
  updateStore.withUser();
  const { baseElement } = renderWithStore(<Logout />);
  expect(firebaseAuth.signOut).toBeCalledTimes(1);
  expect(getStoreState().user.id).toBe('');
  await screen.findAllByText('');
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});
