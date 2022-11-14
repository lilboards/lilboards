import { screen, waitFor } from '@testing-library/react';
import { Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { renderWithContext, router, updateStore } from '../../utils/test';
import Protected from './Protected';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: jest.fn(),
}));

const mockedOutlet = jest.mocked(Outlet);

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useAuth: jest.fn(),
}));

const mockedUseAuth = jest.mocked(useAuth);

beforeEach(() => {
  jest.resetAllMocks();
  mockedUseAuth.mockReturnValue(true);
});

describe('not loaded', () => {
  const props = {
    check: 'id',
    signInAnonymously: true,
  } as const;

  it('renders progress bar', () => {
    mockedUseAuth.mockReset().mockReturnValue(false);
    renderWithContext(<Protected {...props} />);
    expect(mockedOutlet).not.toBeCalled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});

describe('not signed in', () => {
  const props = {
    check: 'id',
  } as const;

  it('does not render protected outlet', () => {
    renderWithContext(<Protected {...props} />);
    expect(mockedOutlet).not.toBeCalled();
  });

  it('navigates to /login', async () => {
    renderWithContext(<Protected {...props} />);
    await waitFor(() => expect(router.state.location.pathname).toBe('/login'));
  });
});

describe('signed in with unverified email', () => {
  const props = {
    check: 'email',
  } as const;

  beforeEach(() => {
    updateStore.withUser(false, { email: 'unverified@email.com' });
  });

  it('does not render protected outlet when email is checked', () => {
    renderWithContext(<Protected {...props} />);
    expect(mockedOutlet).not.toBeCalled();
  });

  it('renders "Send verification email" button', () => {
    updateStore.withUser(false);
    renderWithContext(<Protected {...props} />);
    expect(
      screen.getByRole('button', { name: 'Send verification email' })
    ).toBeInTheDocument();
  });
});

describe('signed in with verified email', () => {
  it('renders protected outlet when email is checked', () => {
    updateStore.withUser();
    renderWithContext(<Protected check="email" />);
    expect(mockedOutlet).toBeCalledTimes(1);
  });
});

describe('props.signInAnonymously=true', () => {
  const props = {
    check: 'id',
    signInAnonymously: true,
  } as const;

  it('calls hook useAuth', () => {
    renderWithContext(<Protected {...props} />);
    expect(mockedUseAuth).toBeCalledTimes(1);
    expect(mockedUseAuth).toBeCalledWith(true);
  });

  it('does not render protected outlet if user does not exist', () => {
    renderWithContext(<Protected {...props} />);
    expect(mockedOutlet).not.toBeCalled();
  });

  it('renders protected outlet if user exists', () => {
    updateStore.withUser();
    renderWithContext(<Protected {...props} />);
    expect(mockedOutlet).toBeCalledTimes(1);
  });

  it('does not navigates to /login', async () => {
    renderWithContext(<Protected {...props} />);
    await waitFor(() =>
      expect(router.state.location.pathname).not.toBe('/login')
    );
  });
});
