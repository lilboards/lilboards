import { screen, waitFor } from '@testing-library/react';

import { useAuth } from '../../hooks';
import { renderWithContext, router, updateStore } from '../../utils/test';
import Protected from './Protected';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useAuth: jest.fn(),
}));

const mockedUseAuth = jest.mocked(useAuth);

const text = 'Protected';

const props = {
  children: <>{text}</>,
};

beforeEach(() => {
  jest.resetAllMocks();
  mockedUseAuth.mockReturnValue(true);
});

it('returns null when useAuth is not loaded', () => {
  mockedUseAuth.mockReset().mockReturnValue(false);
  renderWithContext(<Protected {...props} />);
  expect(screen.queryByText(text)).not.toBeInTheDocument();
});

describe('not signed in', () => {
  it('does not render protected element', () => {
    renderWithContext(<Protected {...props} />);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });

  it('navigates to /login', async () => {
    renderWithContext(<Protected {...props} />);
    await waitFor(() => expect(router.state.location.pathname).toBe('/login'));
  });
});

describe('signed in with unverified email', () => {
  beforeEach(() => {
    updateStore.withUser(false, { email: 'unverified@email.com' });
  });

  it('does not render protected element when email is checked', () => {
    renderWithContext(<Protected {...props} check="email" />);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });

  it('renders "Send verification email" button', () => {
    updateStore.withUser(false);
    renderWithContext(<Protected {...props} check="email" />);
    expect(
      screen.getByRole('button', { name: 'Send verification email' })
    ).toBeInTheDocument();
  });
});

describe('signed in with verified email', () => {
  beforeEach(() => {
    updateStore.withUser();
  });

  it('renders protected element when email is checked', () => {
    renderWithContext(<Protected {...props} check="email" />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

describe('props.signInAnonymously=true', () => {
  it('calls hook useAuth', () => {
    renderWithContext(<Protected {...props} signInAnonymously />);
    expect(mockedUseAuth).toBeCalledTimes(1);
    expect(mockedUseAuth).toBeCalledWith(true);
  });

  it('renders protected element', () => {
    renderWithContext(<Protected {...props} signInAnonymously />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('does not navigates to /login', async () => {
    renderWithContext(<Protected {...props} signInAnonymously />);
    await waitFor(() =>
      expect(router.state.location.pathname).not.toBe('/login')
    );
  });
});
