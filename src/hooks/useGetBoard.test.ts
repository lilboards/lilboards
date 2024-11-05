import { renderHook } from '@testing-library/react';
import { updateStore, wrapper } from 'test/utils';

import { useGetBoard } from './useGetBoard';

it('returns undefined when board does not exist', () => {
  const { result } = renderHook(() => useGetBoard(''), { wrapper });
  expect(result.current).toBe(undefined);
});

it('returns board', () => {
  const { id, ...board } = updateStore.withBoard();
  const { result } = renderHook(() => useGetBoard(id), { wrapper });
  expect(result.current).toEqual(board);
});
