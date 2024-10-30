import { renderHook } from '@testing-library/react';
import { updateStore, wrapper } from 'test/utils';

import { useGetRowIds } from './useGetRowIds';

it('returns empty array when there are no rows', () => {
  const { result } = renderHook(() => useGetRowIds(), { wrapper });
  expect(result.current).toEqual([]);
});

it('returns array of row id', () => {
  const row = updateStore.withRow();
  const { result } = renderHook(() => useGetRowIds(), { wrapper });
  expect(result.current).toEqual([row.id]);
});
