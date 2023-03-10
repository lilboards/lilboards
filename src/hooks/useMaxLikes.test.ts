import { renderHook } from '@testing-library/react';

import { BOARD_TEST_ID } from '../constants/test';
import type { RootState } from '../types';
import { useSelector } from '.';
import { DEFAULT_MAX_LIKES, useMaxLikes } from './useMaxLikes';

jest.mock('.', () => ({
  useSelector: jest.fn(),
}));

const mockedUseSelector = jest.mocked(useSelector);

describe('when boards are empty', () => {
  const state = {
    boards: {},
  } as RootState;

  it('returns default max likes', () => {
    mockedUseSelector.mockImplementationOnce((callback) => callback(state));
    const { result } = renderHook(() => useMaxLikes(BOARD_TEST_ID));
    expect(result.current).toBe(DEFAULT_MAX_LIKES);
  });
});

describe('when board is undefined', () => {
  const state = {
    boards: {
      [`${BOARD_TEST_ID}2`]: {
        maxLikes: DEFAULT_MAX_LIKES - 1,
      },
    },
  } as RootState;

  it('returns default max likes', () => {
    mockedUseSelector.mockImplementationOnce((callback) => callback(state));
    const { result } = renderHook(() => useMaxLikes(BOARD_TEST_ID));
    expect(result.current).toBe(DEFAULT_MAX_LIKES);
  });
});

describe('when maxLikes is undefined', () => {
  const maxLikes = undefined;
  const state = {
    boards: {
      [BOARD_TEST_ID]: {
        maxLikes,
      },
    },
  } as unknown as RootState;

  it('returns default max likes', () => {
    mockedUseSelector.mockImplementationOnce((callback) => callback(state));
    const { result } = renderHook(() => useMaxLikes(BOARD_TEST_ID));
    expect(result.current).toBe(DEFAULT_MAX_LIKES);
  });
});

describe('when maxLikes is valid', () => {
  const maxLikes = DEFAULT_MAX_LIKES + 1;
  const state = {
    boards: {
      [BOARD_TEST_ID]: {
        maxLikes,
      },
    },
  } as unknown as RootState;

  it('returns max likes', () => {
    mockedUseSelector.mockImplementationOnce((callback) => callback(state));
    const { result } = renderHook(() => useMaxLikes(BOARD_TEST_ID));
    expect(result.current).toBe(maxLikes);
  });
});

describe('when maxLikes is 0', () => {
  const maxLikes = 0;
  const state = {
    boards: {
      [BOARD_TEST_ID]: {
        maxLikes,
      },
    },
  } as unknown as RootState;

  it('returns 0', () => {
    mockedUseSelector.mockImplementationOnce((callback) => callback(state));
    const { result } = renderHook(() => useMaxLikes(BOARD_TEST_ID));
    expect(result.current).toBe(maxLikes);
  });
});
