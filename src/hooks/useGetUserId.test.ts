import { renderHook } from '@testing-library/react';
import { updateStore, wrapper } from 'test/utils';

import { useGetUserId } from './useGetUserId';

it('returns empty string when user does not exist', () => {
  const { result } = renderHook(() => useGetUserId(), { wrapper });
  expect(result.current).toBe('');
});

it('returns user id', () => {
  const user = updateStore.withUser();
  const { result } = renderHook(() => useGetUserId(), { wrapper });
  expect(result.current).toBe(user.id);
});
