import { render } from '@testing-library/react';
import * as firebaseui from 'firebaseui';

import { onAuthStateChanged } from '../../firebase/auth';
import StyledFirebaseAuth from './StyledFirebaseAuth';
import uiConfig from './uiConfig';

jest.mock('firebaseui', () => {
  class AuthUI {
    static getInstance() {
      return this;
    }
    static reset = jest.fn();
    static start = jest.fn();
  }
  return { auth: { AuthUI } };
});

const mockedFirebaseui = jest.mocked(firebaseui);

jest.mock('../../firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
}));

const mockedOnAuthStateChanged = jest.mocked(onAuthStateChanged);

function getAuthUI() {
  return mockedFirebaseui.auth.AuthUI.getInstance()!;
}

beforeEach(() => {
  jest.clearAllMocks();
  mockedOnAuthStateChanged.mockReturnValue(jest.fn());
});

it('gets existing AuthUI', () => {
  render(<StyledFirebaseAuth />);
  expect(getAuthUI()).toBeInstanceOf(Function);
});

it('resets the AuthUI', () => {
  render(<StyledFirebaseAuth />);
  expect(getAuthUI().reset).toBeCalledTimes(1);
});

it('starts the AuthUI', () => {
  render(<StyledFirebaseAuth />);
  expect(getAuthUI().start).toBeCalledTimes(1);
  expect(getAuthUI().start).toBeCalledWith(
    expect.any(HTMLDivElement),
    uiConfig,
  );
});

describe('user signs in', () => {
  beforeEach(() => {
    mockedOnAuthStateChanged.mockReset().mockImplementation((callback) => {
      const user = {};
      callback(user as any);
      return jest.fn();
    });
  });

  it('calls onAuthStateChanged and resets AuthUI', () => {
    render(<StyledFirebaseAuth />);
    expect(mockedOnAuthStateChanged).toBeCalledTimes(2);
    expect(getAuthUI().reset).toBeCalledTimes(3);
    jest.clearAllMocks();
  });
});

describe('user signs out', () => {
  beforeEach(() => {
    mockedOnAuthStateChanged.mockReset().mockImplementation((callback) => {
      const user = null;
      callback(user);
      return jest.fn();
    });
  });

  it('calls onAuthStateChanged and resets AuthUI', () => {
    render(<StyledFirebaseAuth />);
    expect(mockedOnAuthStateChanged).toBeCalledTimes(1);
    expect(getAuthUI().reset).toBeCalledTimes(1);
  });
});

describe('user signs in and out', () => {
  beforeEach(() => {
    mockedOnAuthStateChanged
      .mockReset()
      .mockImplementationOnce((callback) => {
        const user = {};
        callback(user as any);
        return jest.fn();
      })
      .mockImplementation((callback) => {
        const user = null;
        callback(user);
        return jest.fn();
      });
  });

  it('calls onAuthStateChanged and resets AuthUI', () => {
    render(<StyledFirebaseAuth />);
    expect(mockedOnAuthStateChanged).toBeCalledTimes(3);
    expect(getAuthUI().reset).toBeCalledTimes(6);
  });
});

describe('unmount', () => {
  it('resets AuthUI', () => {
    const { unmount } = render(<StyledFirebaseAuth />);
    jest.clearAllMocks();
    unmount();
    expect(mockedOnAuthStateChanged).toBeCalledTimes(0);
    expect(getAuthUI().reset).toBeCalledTimes(1);
  });
});
