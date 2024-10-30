import { renderHook } from '@testing-library/react';
import { updateStore, wrapper } from 'test/utils';

import { useGetRow } from './useGetRow';

it('returns empty string when row does not exist', () => {
  const { result } = renderHook(() => useGetRow(''), { wrapper });
  expect(result.current).toBe(undefined);
});

it('returns row', () => {
  const { id, ...row } = updateStore.withRow();
  const { result } = renderHook(() => useGetRow(id), { wrapper });
  expect(result.current).toEqual(row);
});
