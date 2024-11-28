import { renderHook } from '@testing-library/react';
import { updateStore, wrapper } from 'test/utils';

import { useRowIds } from './useRowIds';

it('returns empty array when there are no rows', () => {
  const { result } = renderHook(() => useRowIds(), { wrapper });
  expect(result.current).toEqual([]);
});

it('returns array of row id', () => {
  const row = updateStore.withRow();
  const { result } = renderHook(() => useRowIds(), { wrapper });
  expect(result.current).toEqual([row.id]);
});
