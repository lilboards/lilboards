import { renderHook } from '@testing-library/react';
import { updateStore, wrapper } from 'test/utils';

import { useItem } from './useItem';

it('returns empty string when item does not exist', () => {
  const { result } = renderHook(() => useItem(''), { wrapper });
  expect(result.current).toBe(undefined);
});

it('returns item', () => {
  const { id, ...item } = updateStore.withItem();
  const { result } = renderHook(() => useItem(id), { wrapper });
  expect(result.current).toEqual(item);
});
