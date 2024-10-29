import { renderHook } from '@testing-library/react';
import { updateStore, wrapper } from 'test/utils';

import { useIsLoggedIn } from './useIsLoggedIn';

it('returns false when user is not logged in', () => {
  const { result } = renderHook(() => useIsLoggedIn(), { wrapper });
  expect(result.current).toBe(false);
});

it('returns true when user email exists', () => {
  updateStore.withUser();
  const { result } = renderHook(() => useIsLoggedIn(), { wrapper });
  expect(result.current).toBe(true);
});
