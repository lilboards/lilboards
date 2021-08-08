import { screen } from '@testing-library/react';
import {
  USER_TEST_EMAIL as userEmail,
  USER_TEST_ID as userId,
} from '../../constants/test';
import { firebaseAuth } from '../../firebase';
import { history, renderWithContext } from '../../utils/test';
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
    renderWithContext(<Protected {...props} />);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });

  it('redirects to "/login"', async () => {
    renderWithContext(<Protected {...props} />);
    await screen.findAllByText('');
    expect(history.location.pathname).toBe('/login');
  });
});

describe('signed in with unverified email', () => {
  beforeEach(() => {
    (firebaseAuth.onAuthStateChanged as jest.Mock).mockImplementationOnce(
      (callback) => {
        const user = {
          email: userEmail,
          emailVerified: false,
          uid: userId,
        };
        callback(user);
      }
    );
  });

  it('does not render protected component when email is checked', () => {
    renderWithContext(<Protected {...props} check="email" />);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });

  it('renders "Send verification email" button', () => {
    renderWithContext(<Protected {...props} check="email" />);
    expect(
      screen.getByRole('button', { name: 'Send verification email' })
    ).toBeInTheDocument();
  });
});

describe('signed in with verified email', () => {
  beforeEach(() => {
    (firebaseAuth.onAuthStateChanged as jest.Mock).mockImplementationOnce(
      (callback) => {
        const user = {
          email: userEmail,
          emailVerified: true,
          uid: userId,
        };
        callback(user);
      }
    );
  });

  it('renders protected component when email is checked', () => {
    renderWithContext(<Protected {...props} check="email" />);
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
    renderWithContext(<Protected {...props} check="email" />);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });

  it('renders protected component when id is checked', () => {
    renderWithContext(<Protected {...props} check="id" />);
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
    renderWithContext(<Protected {...props} signInAnonymously />);
    expect(firebaseAuth.signInAnonymously).toBeCalledTimes(1);
  });
});
