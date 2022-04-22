import { screen, waitFor } from '@testing-library/react';

import {
  USER_TEST_EMAIL as userEmail,
  USER_TEST_ID as userId,
} from '../../constants/test';
import {
  logEvent,
  onAuthStateChanged,
  signInAnonymously,
} from '../../firebase';
import { history, renderWithContext } from '../../utils/test';
import Protected from './Protected';

jest.mock('../../firebase', () => ({
  logEvent: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signInAnonymously: jest.fn(),
}));

const text = 'Protected';

const props = {
  component: () => <>{text}</>,
  path: '/protected',
};

beforeEach(() => {
  (logEvent as jest.Mock).mockClear();
});

describe('not signed in', () => {
  beforeEach(() => {
    const user = null;
    (onAuthStateChanged as jest.Mock).mockImplementationOnce((callback) =>
      callback(user)
    );
  });

  it('does not render protected component', () => {
    renderWithContext(<Protected {...props} />);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
    expect(logEvent).not.toBeCalled();
  });

  it('redirects to "/login"', async () => {
    renderWithContext(<Protected {...props} />);
    await waitFor(() => expect(history.location.pathname).toBe('/login'));
  });
});

describe('signed in with unverified email', () => {
  beforeEach(() => {
    const user = {
      email: userEmail,
      emailVerified: false,
      uid: userId,
    };
    (onAuthStateChanged as jest.Mock).mockImplementationOnce((callback) =>
      callback(user)
    );
  });

  it('does not render protected component when email is checked', () => {
    renderWithContext(<Protected {...props} check="email" />);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
    expect(logEvent).toBeCalledTimes(1);
    expect(logEvent).toBeCalledWith('login', {
      type: 'authenticated',
      email_verified: false,
    });
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
    const user = {
      email: userEmail,
      emailVerified: true,
      uid: userId,
    };
    (onAuthStateChanged as jest.Mock).mockImplementationOnce((callback) =>
      callback(user)
    );
  });

  it('renders protected component when email is checked', () => {
    renderWithContext(<Protected {...props} check="email" />);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(logEvent).toBeCalledTimes(1);
    expect(logEvent).toBeCalledWith('login', {
      type: 'authenticated',
      email_verified: true,
    });
  });
});

describe('signed in with uid', () => {
  beforeEach(() => {
    const user = {
      uid: userId,
    };
    (onAuthStateChanged as jest.Mock).mockImplementationOnce((callback) =>
      callback(user)
    );
  });

  it('does not render protected component when email is checked', () => {
    renderWithContext(<Protected {...props} check="email" />);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
    expect(logEvent).toBeCalledTimes(1);
    expect(logEvent).toBeCalledWith('login', {
      type: 'authenticated',
      email_verified: undefined,
    });
  });

  it('renders protected component when id is checked', () => {
    renderWithContext(<Protected {...props} check="id" />);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(logEvent).toBeCalledTimes(1);
    expect(logEvent).toBeCalledWith('login', {
      type: 'authenticated',
      email_verified: undefined,
    });
  });
});

describe('with sign-in anonymously', () => {
  beforeEach(() => {
    const user = null;
    (onAuthStateChanged as jest.Mock).mockImplementationOnce((callback) =>
      callback(user)
    );
  });

  it('signs in anonymously', () => {
    renderWithContext(<Protected {...props} signInAnonymously />);
    expect(signInAnonymously).toBeCalledTimes(1);
    expect(logEvent).toBeCalledTimes(1);
    expect(logEvent).toBeCalledWith('login', {
      type: 'anonymous',
    });
  });
});
