import { renderHook } from '@testing-library/react';
import { DatabaseKey } from 'src/constants';
import type { RootState } from 'src/types';
import { userId } from 'test/constants';

import { useIsAdmin } from './useIsAdmin';
import { useSelector } from './useSelector';

jest.mock('./useSelector', () => ({
  useSelector: jest.fn(),
}));

const mockedUseSelector = jest.mocked(useSelector);

const dataId = 'dataId';

describe.each([DatabaseKey.boards, DatabaseKey.lists] as const)(
  '%s',
  (type) => {
    it(`is not admin when ${type} id is empty`, () => {
      mockedUseSelector.mockImplementationOnce((callback) =>
        callback(undefined as unknown as RootState),
      );
      const { result } = renderHook(() => useIsAdmin(type, ''));
      expect(result.current).toBe(false);
    });

    it(`is not admin when ${type} does not exist`, () => {
      const state = {
        [type]: {},
      };
      mockedUseSelector.mockImplementationOnce((callback) =>
        callback(state as RootState),
      );
      const { result } = renderHook(() => useIsAdmin(type, dataId));
      expect(result.current).toBe(false);
    });

    it('is not admin when created by does not exist', () => {
      const state = {
        [type]: {
          [dataId]: {},
        },
      };
      mockedUseSelector.mockImplementationOnce((callback) =>
        callback(state as unknown as RootState),
      );
      const { result } = renderHook(() => useIsAdmin(type, dataId));
      expect(result.current).toBe(false);
    });

    it('is not admin when user id does not exist', () => {
      const state = {
        [type]: {
          [dataId]: {
            createdBy: userId,
          },
        },
        user: {},
      };
      mockedUseSelector.mockImplementationOnce((callback) =>
        callback(state as unknown as RootState),
      );
      const { result } = renderHook(() => useIsAdmin(type, dataId));
      expect(result.current).toBe(false);
    });

    it('is not admin when created by does not match user id', () => {
      const state = {
        [type]: {
          [dataId]: {
            createdBy: userId,
          },
        },
        user: {
          id: `${userId}2`,
        },
      };
      mockedUseSelector.mockImplementationOnce((callback) =>
        callback(state as unknown as RootState),
      );
      const { result } = renderHook(() => useIsAdmin(type, dataId));
      expect(result.current).toBe(false);
    });

    it('is admin when created by matches user id', () => {
      const state = {
        [type]: {
          [dataId]: {
            createdBy: userId,
          },
        },
        user: {
          id: userId,
        },
      };
      mockedUseSelector.mockImplementationOnce((callback) =>
        callback(state as unknown as RootState),
      );
      const { result } = renderHook(() => useIsAdmin(type, dataId));
      expect(result.current).toBe(true);
    });
  },
);
