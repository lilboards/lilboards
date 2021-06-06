import { auth as firebaseAuth } from '../../firebase';
import { getStoreState, renderWithStore, updateStore } from '../../utils/test';
import Logout from './Logout';

jest.mock('../../firebase', () => ({
  auth: {
    signOut: jest.fn(),
  },
}));

it('signs user out', () => {
  updateStore.withUser();
  renderWithStore(<Logout />);
  expect(firebaseAuth.signOut).toBeCalledTimes(1);
  expect(getStoreState().user.id).toBe('');
});
