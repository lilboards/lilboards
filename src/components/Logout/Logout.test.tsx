import { auth as firebaseAuth } from '../../firebase';
import { renderWithStore } from '../../utils/test';
import { actions } from '../../slices/userSlice';
import store from '../../store';
import Logout from './Logout';

jest.mock('../../firebase', () => ({
  auth: {
    signOut: jest.fn(),
  },
}));

it('signs user out', () => {
  store.dispatch(actions.setUser('user_id'));
  renderWithStore(<Logout />);
  expect(firebaseAuth.signOut).toBeCalledTimes(1);
  expect(store.getState().user.id).toBe('');
});
