import { screen, waitFor } from '@testing-library/react';
import type { Location } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { REDIRECT_TO } from '../../constants';
import {
  USER_TEST_EMAIL as userEmail,
  USER_TEST_ID as userId,
} from '../../constants/test';
import { onAuthStateChanged } from '../../firebase';
import { renderWithContext, router } from '../../utils/test';
import Login from './Login';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

const mockedUseLocation = jest.mocked(useLocation);

jest.mock('react-firebaseui/StyledFirebaseAuth', () => () => <></>);

jest.mock('../../firebase', () => ({
  logEvent: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

describe('not logged in', () => {
  beforeEach(() => {
    (onAuthStateChanged as jest.Mock).mockImplementationOnce((callback) => {
      const user = null;
      callback(user);
    });
  });

  it('renders "Sign In"', () => {
    renderWithContext(<Login />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Sign In',
      })
    ).toBeInTheDocument();
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
    (onAuthStateChanged as jest.Mock).mockImplementationOnce((callback) => {
      const user = {
        email: userEmail,
        id: userId,
      };
      callback(user);
    });
    mockedUseLocation.mockReset();
  });

  it('does not render "Sign In"', () => {
    mockedUseLocation.mockReturnValueOnce(location);
    renderWithContext(<Login />);
    expect(screen.queryAllByText('Sign In')).toHaveLength(0);
  });

  it.each([undefined, { state: {} }, { state: { [REDIRECT_TO]: '/' } }])(
    'redirects to "/boards" when location=%p',
    async (location) => {
      mockedUseLocation.mockReturnValueOnce(location as Location);
      renderWithContext(<Login />);
      await waitFor(() =>
        expect(router.state.location.pathname).toBe('/boards')
      );
    }
  );

  it(`redirects to location.state.${REDIRECT_TO}`, async () => {
    mockedUseLocation.mockReturnValue(location);
    renderWithContext(<Login />);
    await waitFor(() =>
      expect(router.state.location.pathname).toBe(redirectTo)
    );
  });
});
