import { renderHook } from '@testing-library/react';
import type { Unsubscribe, User } from 'firebase/auth';

import { store, wrapper } from '../../test/utils';
import {
  USER_TEST_EMAIL as userEmail,
  USER_TEST_ID as userId,
} from '../constants/test';
import { logEvent, onAuthStateChanged, signInAnonymously } from '../firebase';
import { useAuth } from './useAuth';

jest.mock('../firebase', () => ({
  logEvent: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signInAnonymously: jest.fn(),
}));

const mockedOnAuthStateChanged = jest.mocked(onAuthStateChanged);

beforeEach(() => {
  jest.resetAllMocks();
});

describe('shouldSignInAnonymously is false', () => {
  describe('user is not signed in', () => {
    beforeEach(() => {
      const user = null;
      mockedOnAuthStateChanged.mockImplementationOnce(
        (callback) => callback(user) as unknown as Unsubscribe,
      );
    });

    it('does not update user in store', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      expect(result.current).toBe(true);
      expect(logEvent).not.toBeCalled();
      expect(store.getState().user).toMatchObject({
        email: null,
        emailVerified: false,
        id: '',
      });
    });
  });

  describe('user is signed in with unverified email', () => {
    beforeEach(() => {
      const user = {
        email: userEmail,
        emailVerified: false,
        uid: userId,
      };
      mockedOnAuthStateChanged.mockImplementationOnce(
        (callback) => callback(user as User) as unknown as Unsubscribe,
      );
    });

    it('updates user in store', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      expect(result.current).toBe(true);
      expect(logEvent).toBeCalledTimes(1);
      expect(logEvent).toBeCalledWith('login', {
        type: 'authenticated',
        email_verified: false,
      });
      expect(store.getState().user).toMatchObject({
        email: userEmail,
        emailVerified: false,
        id: userId,
      });
    });
  });

  describe('user is signed in with verified email', () => {
    beforeEach(() => {
      const user = {
        email: userEmail,
        emailVerified: true,
        uid: userId,
      };
      mockedOnAuthStateChanged.mockImplementationOnce(
        (callback) => callback(user as User) as unknown as Unsubscribe,
      );
    });

    it('updates user in store', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      expect(result.current).toBe(true);
      expect(logEvent).toBeCalledTimes(1);
      expect(logEvent).toBeCalledWith('login', {
        type: 'authenticated',
        email_verified: true,
      });
      expect(store.getState().user).toMatchObject({
        email: userEmail,
        emailVerified: true,
        id: userId,
      });
    });
  });

  describe('user is signed in with uid', () => {
    beforeEach(() => {
      const user = {
        uid: userId,
      };
      mockedOnAuthStateChanged.mockImplementationOnce(
        (callback) => callback(user as User) as unknown as Unsubscribe,
      );
    });

    it('updates user in store', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      expect(result.current).toBe(true);
      expect(logEvent).toBeCalledTimes(1);
      expect(logEvent).toBeCalledWith('login', {
        type: 'authenticated',
        email_verified: undefined,
      });
      expect(store.getState().user).toMatchObject({
        email: undefined,
        emailVerified: undefined,
        id: userId,
      });
    });
  });
});

describe('shouldSignInAnonymously is true', () => {
  const shouldSignInAnonymously = true;

  beforeEach(() => {
    const user = null;
    mockedOnAuthStateChanged.mockImplementationOnce(
      (callback) => callback(user) as unknown as Unsubscribe,
    );
  });

  it('signs in anonymously', () => {
    const { result } = renderHook(() => useAuth(shouldSignInAnonymously), {
      wrapper,
    });
    expect(result.current).toBe(false);
    expect(signInAnonymously).toBeCalledTimes(1);
    expect(logEvent).toBeCalledTimes(1);
    expect(logEvent).toBeCalledWith('login', {
      type: 'anonymous',
    });
    expect(store.getState().user).toMatchObject({
      email: null,
      emailVerified: false,
      id: '',
    });
  });
});
