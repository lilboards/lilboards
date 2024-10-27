import { renderHook } from '@testing-library/react';
import { boardId } from 'test/constants';
import { updateStore, wrapper } from 'test/utils';

import { DEFAULT_MAX_LIKES, useMaxLikes } from './useMaxLikes';

describe('when state is empty', () => {
  it('returns default max likes', () => {
    const { result } = renderHook(() => useMaxLikes(boardId), {
      wrapper,
    });
    expect(result.current).toBe(DEFAULT_MAX_LIKES);
  });
});

describe('when maxLikes is undefined', () => {
  it('returns default max likes', () => {
    updateStore.withBoard();
    const { result } = renderHook(() => useMaxLikes(boardId), {
      wrapper,
    });
    expect(result.current).toBe(DEFAULT_MAX_LIKES);
  });
});

describe('when maxLikes is valid', () => {
  it('returns max likes', () => {
    const maxLikes = DEFAULT_MAX_LIKES + 1;
    updateStore.withBoard({ maxLikes });
    const { result } = renderHook(() => useMaxLikes(boardId), {
      wrapper,
    });
    expect(result.current).toBe(maxLikes);
  });
});

describe('when maxLikes is 0', () => {
  it('returns 0', () => {
    const maxLikes = 0;
    updateStore.withBoard({ maxLikes });
    const { result } = renderHook(() => useMaxLikes(boardId), {
      wrapper,
    });
    expect(result.current).toBe(maxLikes);
  });
});
