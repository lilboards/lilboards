import { render } from '@testing-library/react';
import type { User } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import { onAuthStateChanged } from 'src/firebase/auth';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';

import StyledFirebaseAuth from './StyledFirebaseAuth';
import uiConfig from './uiConfig';

vi.mock('firebaseui', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebaseui')>();

  interface AuthUI {
    new (firebaseAuth: unknown): void;
    getInstance: () => AuthUI;
    reset: Mock;
    start: Mock;
  }

  const AuthUI: AuthUI = Object.assign(
    function AuthUI() {
      return;
    } as unknown as AuthUI,
    {
      getInstance() {
        return this;
      },
      reset: vi.fn(),
      start: vi.fn(),
    },
  );

  return {
    ...actual,
    auth: { AuthUI },
  };
});

const mockedFirebaseui = vi.mocked(firebaseui);

vi.mock('src/firebase/auth');

const mockedOnAuthStateChanged = vi.mocked(onAuthStateChanged);

function getAuthUI() {
  return mockedFirebaseui.auth.AuthUI.getInstance() as unknown as {
    reset: Mock;
    start: Mock;
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  mockedOnAuthStateChanged.mockReturnValue(vi.fn());
});

it('gets existing AuthUI', () => {
  render(<StyledFirebaseAuth />);
  expect(getAuthUI()).toBeInstanceOf(Function);
});

it('resets the AuthUI', () => {
  render(<StyledFirebaseAuth />);
  expect(getAuthUI().reset).toHaveBeenCalledTimes(1);
});

it('starts the AuthUI', () => {
  render(<StyledFirebaseAuth />);
  expect(getAuthUI().start).toHaveBeenCalledTimes(1);
  expect(getAuthUI().start).toHaveBeenCalledWith(
    expect.any(HTMLDivElement),
    uiConfig,
  );
});

describe('user signs in', () => {
  beforeEach(() => {
    mockedOnAuthStateChanged.mockReset().mockImplementation((callback) => {
      const user = {};
      callback(user as User);
      return vi.fn();
    });
  });

  it('calls onAuthStateChanged and resets AuthUI', () => {
    render(<StyledFirebaseAuth />);
    expect(mockedOnAuthStateChanged).toHaveBeenCalledTimes(2);
    expect(getAuthUI().reset).toHaveBeenCalledTimes(3);
    vi.clearAllMocks();
  });
});

describe('user signs out', () => {
  beforeEach(() => {
    mockedOnAuthStateChanged.mockReset().mockImplementation((callback) => {
      const user = null;
      callback(user);
      return vi.fn();
    });
  });

  it('calls onAuthStateChanged and resets AuthUI', () => {
    render(<StyledFirebaseAuth />);
    expect(mockedOnAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(getAuthUI().reset).toHaveBeenCalledTimes(1);
  });
});

describe('user signs in and out', () => {
  beforeEach(() => {
    mockedOnAuthStateChanged
      .mockReset()
      .mockImplementationOnce((callback) => {
        const user = {};
        callback(user as User);
        return vi.fn();
      })
      .mockImplementation((callback) => {
        const user = null;
        callback(user);
        return vi.fn();
      });
  });

  it('calls onAuthStateChanged and resets AuthUI', () => {
    render(<StyledFirebaseAuth />);
    expect(mockedOnAuthStateChanged).toHaveBeenCalledTimes(3);
    expect(getAuthUI().reset).toHaveBeenCalledTimes(6);
  });
});

describe('unmount', () => {
  it('resets AuthUI', () => {
    const { unmount } = render(<StyledFirebaseAuth />);
    vi.clearAllMocks();
    unmount();
    expect(mockedOnAuthStateChanged).toHaveBeenCalledTimes(0);
    expect(getAuthUI().reset).toHaveBeenCalledTimes(1);
  });
});
