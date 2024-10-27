import { screen, waitFor } from '@testing-library/react';
import type { Location } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { REDIRECT_TO } from 'src/constants';
import { onAuthStateChanged } from 'src/firebase';
import { email, userId } from 'test/constants';
import { renderWithProviders, router } from 'test/utils';

import Login from './Login';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

const mockedUseLocation = jest.mocked(useLocation);

jest.mock('./StyledFirebaseAuth', () => () => <>StyledFirebaseAuth</>);

jest.mock('../../firebase', () => ({
  logEvent: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

const mockedOnAuthStateChanged = jest.mocked(onAuthStateChanged);

describe('not logged in', () => {
  beforeEach(() => {
    mockedOnAuthStateChanged.mockImplementationOnce((callback) => {
      const user = null;
      callback(user);
      return () => {};
    });
  });

  it('renders "Sign In"', () => {
    renderWithProviders(<Login />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Sign In',
      }),
    ).toBeInTheDocument();
  });

  it('renders StyledFirebaseAuth', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText('StyledFirebaseAuth')).toBeInTheDocument();
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
      };
      callback(user as any);
      return () => {};
    });
    mockedUseLocation.mockReset();
  });

  it('does not render "Sign In"', () => {
    mockedUseLocation.mockReturnValueOnce(location);
    renderWithProviders(<Login />);
    expect(screen.queryAllByText('Sign In')).toHaveLength(0);
  });

  it.each([undefined, { state: {} }, { state: { [REDIRECT_TO]: '/' } }])(
    'redirects to "/boards" when location=%p',
    async (location) => {
      mockedUseLocation.mockReturnValueOnce(location as Location);
      renderWithProviders(<Login />);
      await waitFor(() =>
        expect(router.state.location.pathname).toBe('/boards'),
      );
    },
  );

  it(`redirects to location.state.${REDIRECT_TO}`, async () => {
    mockedUseLocation.mockReturnValue(location);
    renderWithProviders(<Login />);
    await waitFor(() =>
      expect(router.state.location.pathname).toBe(redirectTo),
    );
  });
});
