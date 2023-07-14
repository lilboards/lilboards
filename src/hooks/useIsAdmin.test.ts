import { renderHook } from '@testing-library/react';

import type { RootState } from '../types';
import { useIsAdmin } from './useIsAdmin';
import { useSelector } from './useSelector';

jest.mock('./useSelector', () => ({
  useSelector: jest.fn(),
}));

const mockedUseSelector = jest.mocked(useSelector);

const boardId = 'board-id';
const userId = 'user-id';

it('is not admin when board id is empty', () => {
  mockedUseSelector.mockImplementationOnce((callback) =>
    callback(undefined as unknown as RootState),
  );
  const { result } = renderHook(() => useIsAdmin(''));
  expect(result.current).toBe(false);
});

it('is not admin when board does not exist', () => {
  const state = {
    boards: {},
  };
  mockedUseSelector.mockImplementationOnce((callback) =>
    callback(state as RootState),
  );
  const { result } = renderHook(() => useIsAdmin(boardId));
  expect(result.current).toBe(false);
});

it('is not admin when created by does not exist', () => {
  const state = {
    boards: {
      [boardId]: {},
    },
  };
  mockedUseSelector.mockImplementationOnce((callback) =>
    callback(state as unknown as RootState),
  );
  const { result } = renderHook(() => useIsAdmin(boardId));
  expect(result.current).toBe(false);
});

it('is not admin when user id does not exist', () => {
  const state = {
    boards: {
      [boardId]: {
        createdBy: userId,
      },
    },
    user: {},
  };
  mockedUseSelector.mockImplementationOnce((callback) =>
    callback(state as unknown as RootState),
  );
  const { result } = renderHook(() => useIsAdmin(boardId));
  expect(result.current).toBe(false);
});

it('is not admin when created by does not match user id', () => {
  const state = {
    boards: {
      [boardId]: {
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
  const { result } = renderHook(() => useIsAdmin(boardId));
  expect(result.current).toBe(false);
});

it('is admin when created by matches user id', () => {
  const state = {
    boards: {
      [boardId]: {
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
  const { result } = renderHook(() => useIsAdmin(boardId));
  expect(result.current).toBe(true);
});
