import { screen } from '@testing-library/react';
import { renderWithStore } from '../../utils/test';
import { firebaseAuth } from '../../firebase';
import {
  USER_TEST_EMAIL as userEmail,
  USER_TEST_ID as userId,
} from '../../constants/test';
import Login from './Login';

jest.mock('../../firebase', () => ({
  firebaseAnalytics: {
    logEvent: jest.fn(),
  },
  firebaseAuth: {
    onAuthStateChanged: jest.fn(),
  },
}));

jest.mock('react-firebaseui/StyledFirebaseAuth', () => () => <></>);

describe('not logged in', () => {
  beforeEach(() => {
    (firebaseAuth.onAuthStateChanged as jest.Mock).mockImplementationOnce(
      (callback) => {
        const user = null;
        callback(user);
      }
    );
  });

  it('renders "Sign In"', () => {
    renderWithStore(<Login />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Sign In',
      })
    ).toBeInTheDocument();
  });
});

describe('logged in user', () => {
  beforeEach(() => {
    (firebaseAuth.onAuthStateChanged as jest.Mock).mockImplementationOnce(
      (callback) => {
        const user = {
          email: userEmail,
          id: userId,
        };
        callback(user);
      }
    );
  });

  it('does not render "Sign In"', () => {
    renderWithStore(<Login />);
    expect(screen.queryAllByText('Sign In')).toHaveLength(0);
  });
});
