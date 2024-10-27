import { screen, waitFor } from '@testing-library/react';
import { Outlet } from 'react-router-dom';

import { renderWithProviders, router, updateStore } from '../../../test/utils';
import { useAuth } from '../../hooks';
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
    renderWithProviders(<Protected {...props} />);
    expect(mockedOutlet).not.toHaveBeenCalled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});

describe('not signed in', () => {
  const props = {
    check: 'id',
  } as const;

  it('does not render protected outlet', () => {
    renderWithProviders(<Protected {...props} />);
    expect(mockedOutlet).not.toHaveBeenCalled();
  });

  it('navigates to /login', async () => {
    renderWithProviders(<Protected {...props} />);
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
    renderWithProviders(<Protected {...props} />);
    expect(mockedOutlet).not.toHaveBeenCalled();
  });

  it('renders "Send verification email" button', () => {
    updateStore.withUser(false);
    renderWithProviders(<Protected {...props} />);
    expect(
      screen.getByRole('button', { name: 'Send verification email' }),
    ).toBeInTheDocument();
  });
});

describe('signed in with verified email', () => {
  it('renders protected outlet when email is checked', () => {
    updateStore.withUser();
    renderWithProviders(<Protected check="email" />);
    expect(mockedOutlet).toHaveBeenCalledTimes(1);
  });
});

describe('props.signInAnonymously=true', () => {
  const props = {
    check: 'id',
    signInAnonymously: true,
  } as const;

  it('calls hook useAuth', () => {
    renderWithProviders(<Protected {...props} />);
    expect(mockedUseAuth).toHaveBeenCalledTimes(1);
    expect(mockedUseAuth).toHaveBeenCalledWith(true);
  });

  it('does not render protected outlet if user does not exist', () => {
    renderWithProviders(<Protected {...props} />);
    expect(mockedOutlet).not.toHaveBeenCalled();
  });

  it('renders protected outlet if user exists', () => {
    updateStore.withUser();
    renderWithProviders(<Protected {...props} />);
    expect(mockedOutlet).toHaveBeenCalledTimes(1);
  });

  it('does not navigates to /login', async () => {
    renderWithProviders(<Protected {...props} />);
    await waitFor(() =>
      expect(router.state.location.pathname).not.toBe('/login'),
    );
  });
});
