import { renderHook } from '@testing-library/react';
import { updateStore, wrapper } from 'test/utils';
import { expect, it } from 'vitest';

import { useRow } from './useRow';

it('returns empty string when row does not exist', () => {
  const { result } = renderHook(() => useRow(''), { wrapper });
  expect(result.current).toBe(undefined);
});

it('returns row', () => {
  const { id, ...row } = updateStore.withRow();
  const { result } = renderHook(() => useRow(id), { wrapper });
  expect(result.current).toEqual(row);
});
