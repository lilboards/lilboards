import { screen } from '@testing-library/react';
import {
  USER_TEST_EMAIL as userEmail,
  USER_TEST_ID as userId,
} from '../../constants/test';
import { firebaseAuth } from '../../firebase';
import { history, renderWithStore } from '../../utils/test';
import Protected from './Protected';

jest.mock('../../firebase', () => ({
  firebaseAnalytics: {
    logEvent: jest.fn(),
  },
  firebaseAuth: {
    onAuthStateChanged: jest.fn(),
    signInAnonymously: jest.fn(),
  },
}));

const text = 'Protected';

const props = {
  component: () => <>{text}</>,
  path: '/protected',
};

describe('not signed in', () => {
  beforeEach(() => {
    (firebaseAuth.onAuthStateChanged as jest.Mock).mockImplementationOnce(
      (callback) => callback(null)
    );
  });

  it('does not render protected component', () => {
    renderWithStore(<Protected {...props} />);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });

  it('redirects to "/login"', async () => {
    renderWithStore(<Protected {...props} />);
    await screen.findAllByText('');
    expect(history.location.pathname).toBe('/login');
  });
});

describe('signed in with email', () => {
  beforeEach(() => {
    (firebaseAuth.onAuthStateChanged as jest.Mock).mockImplementationOnce(
      (callback) => {
        const user = {
          email: userEmail,
          uid: userId,
        };
        callback(user);
      }
    );
  });

  it('renders protected component when email is checked', () => {
    renderWithStore(<Protected {...props} check="email" />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

describe('signed in with uid', () => {
  beforeEach(() => {
    (firebaseAuth.onAuthStateChanged as jest.Mock).mockImplementationOnce(
      (callback) => {
        const user = {
          uid: userId,
        };
        callback(user);
      }
    );
  });

  it('does not render protected component when email is checked', () => {
    renderWithStore(<Protected {...props} check="email" />);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });

  it('renders protected component when id is checked', () => {
    renderWithStore(<Protected {...props} check="id" />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

describe('with sign-in anonymously', () => {
  beforeEach(() => {
    (firebaseAuth.onAuthStateChanged as jest.Mock)
      .mockReset()
      .mockImplementationOnce((callback) => callback(null));
  });

  it('signs in anonymously', () => {
    renderWithStore(<Protected {...props} signInAnonymously />);
    expect(firebaseAuth.signInAnonymously).toBeCalledTimes(1);
  });
});
