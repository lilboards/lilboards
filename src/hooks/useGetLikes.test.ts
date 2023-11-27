import { renderHook } from '@testing-library/react';

import { updateStore, wrapper } from '../../test/utils';
import { ITEM_TEST_ID, USER_TEST_ID } from '../constants/test';
import { useGetLikes } from './useGetLikes';

describe('when state is empty', () => {
  it('returns empty array', () => {
    const { result } = renderHook(() => useGetLikes(ITEM_TEST_ID), {
      wrapper,
    });
    expect(result.current).toEqual({});
  });
});

describe('when item exists', () => {
  it('returns likes', () => {
    updateStore.withColumn();
    updateStore.withLike();
    const { result } = renderHook(() => useGetLikes(ITEM_TEST_ID), {
      wrapper,
    });
    expect(result.current).toEqual({ [USER_TEST_ID]: true });
  });
});
