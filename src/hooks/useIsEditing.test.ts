import { renderHook } from '@testing-library/react';
import { boardId } from 'test/constants';
import { updateStore, wrapper } from 'test/utils';

import { useIsEditing } from './useIsEditing';

it('returns false when user is not editing board', () => {
  const { result } = renderHook(() => useIsEditing('boardId', boardId), {
    wrapper,
  });
  expect(result.current).toBe(false);
});

it('returns true when user is editing board', () => {
  updateStore.withUserEditing();
  const { result } = renderHook(() => useIsEditing('boardId', boardId), {
    wrapper,
  });
  expect(result.current).toBe(true);
});
