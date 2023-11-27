import { renderHook } from '@testing-library/react';

import { updateStore, wrapper } from '../../test/utils';
import { useGetUserId } from './useGetUserId';

describe('when state is empty', () => {
  it('returns empty string', () => {
    const { result } = renderHook(() => useGetUserId(), { wrapper });
    expect(result.current).toBe('');
  });
});

describe('when user exists', () => {
  it('returns user id', () => {
    const user = updateStore.withUser();
    const { result } = renderHook(() => useGetUserId(), { wrapper });
    expect(result.current).toBe(user.id);
  });
});
