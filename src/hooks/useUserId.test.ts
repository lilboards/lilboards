import { renderHook } from '@testing-library/react';
import { updateStore, wrapper } from 'test/utils';

import { useUserId } from './useUserId';

it('returns empty string when user does not exist', () => {
  const { result } = renderHook(() => useUserId(), { wrapper });
  expect(result.current).toBe('');
});

it('returns user id', () => {
  const user = updateStore.withUser();
  const { result } = renderHook(() => useUserId(), { wrapper });
  expect(result.current).toBe(user.id);
});
