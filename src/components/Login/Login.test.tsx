import type { WindowLocation as Location } from '@reach/router';
import { screen, waitFor } from '@testing-library/react';

import { REDIRECT_TO } from '../../constants';
import {
  USER_TEST_EMAIL as userEmail,
  USER_TEST_ID as userId,
} from '../../constants/test';
import { onAuthStateChanged } from '../../firebase';
import { history, renderWithContext } from '../../utils/test';
import Login from './Login';

jest.mock('../../firebase', () => ({
  logEvent: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock('react-firebaseui/StyledFirebaseAuth', () => () => <></>);

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
  });

  it('does not render "Sign In"', () => {
    renderWithContext(<Login location={location} />);
    expect(screen.queryAllByText('Sign In')).toHaveLength(0);
  });

  it.each([undefined, { state: {} }, { state: { [REDIRECT_TO]: '/' } }])(
    'redirects to "/boards" when props.location=%p',
    async (location) => {
      renderWithContext(<Login location={location as Location} />);
      await waitFor(() => expect(history.location.pathname).toBe('/boards'));
    }
  );

  it(`redirects to location.state.${REDIRECT_TO}`, async () => {
    renderWithContext(<Login location={location} />);
    await waitFor(() => expect(history.location.pathname).toBe(redirectTo));
  });
});
