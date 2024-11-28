import { renderHook } from '@testing-library/react';
import { itemId, userId } from 'test/constants';
import { updateStore, wrapper } from 'test/utils';

import { useLikes } from './useLikes';

describe('when state is empty', () => {
  it('returns empty array', () => {
    const { result } = renderHook(() => useLikes(itemId), {
      wrapper,
    });
    expect(result.current).toEqual({});
  });
});

describe('when item exists', () => {
  it('returns likes', () => {
    updateStore.withColumn();
    updateStore.withLike();
    const { result } = renderHook(() => useLikes(itemId), {
      wrapper,
    });
    expect(result.current).toEqual({ [userId]: true });
  });
});
