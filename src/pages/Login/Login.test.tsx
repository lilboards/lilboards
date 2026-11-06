import { screen, waitFor } from '@testing-library/react';
import type { Unsubscribe, User } from 'firebase/auth';
import type { Location } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { REDIRECT_TO } from 'src/constants';
import { onAuthStateChanged } from 'src/firebase';
import { email, userId } from 'test/constants';
import { renderWithProviders, router } from 'test/utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Login from './Login';

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal<typeof import('react-router-dom')>()),
  useLocation: vi.fn(),
}));

const mockedUseLocation = vi.mocked(useLocation);

vi.mock('./StyledFirebaseAuth', () => ({
  default: () => <>StyledFirebaseAuth</>,
}));

vi.mock('src/firebase');

const mockedOnAuthStateChanged = vi.mocked(onAuthStateChanged);

describe('not logged in', () => {
  beforeEach(() => {
    mockedOnAuthStateChanged.mockImplementationOnce((callback) => {
      callback(null);
      return undefined as unknown as Unsubscribe;
    });
  });

  it('renders "Sign In"', () => {
    renderWithProviders(<Login />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Sign In',
      }),
    ).toBeVisible();
  });

  it('renders StyledFirebaseAuth', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText('StyledFirebaseAuth')).toBeVisible();
  });
});

describe('logged in', () => {
  const redirectTo = '/boards/abc123';
  const location = {
    state: {
      [REDIRECT_TO]: redirectTo,
    },
  } as Location;

  beforeEach(() => {
    mockedOnAuthStateChanged.mockImplementationOnce((callback) => {
      const user = {
        email,
        id: userId,
      } as unknown as User;
      callback(user);
      return undefined as unknown as Unsubscribe;
    });
    mockedUseLocation.mockReset();
  });

  it('does not render "Sign In"', () => {
    mockedUseLocation.mockReturnValueOnce(location);
    renderWithProviders(<Login />);
    expect(screen.queryAllByText('Sign In')).toHaveLength(0);
  });

  it.each([undefined, { state: {} }, { state: { [REDIRECT_TO]: '/' } }])(
    'redirects to "/boards" when location=%s',
    async (location) => {
      mockedUseLocation.mockReturnValueOnce(location as Location);
      renderWithProviders(<Login />);
      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/boards');
      });
    },
  );

  it(`redirects to location.state.${REDIRECT_TO}`, async () => {
    mockedUseLocation.mockReturnValue(location);
    renderWithProviders(<Login />);
    await waitFor(() => {
      expect(router.state.location.pathname).toBe(redirectTo);
    });
  });
});
