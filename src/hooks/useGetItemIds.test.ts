import { renderHook } from '@testing-library/react';

import { COLUMN_TEST_ID, ITEM_TEST_ID } from '../constants/test';
import { updateStore, wrapper } from '../utils/test';
import { useGetItemIds } from './useGetItemIds';

describe.each([{}, { columns: {} }, { columns: { [COLUMN_TEST_ID]: {} } }])(
  'when state is %j',
  (state) => {
    it('returns empty array', () => {
      const { result } = renderHook(() => useGetItemIds(COLUMN_TEST_ID), {
        wrapper,
      });
      expect(result.current).toEqual([]);
    });
  }
);

describe('when column exists', () => {
  it('returns item ids', () => {
    updateStore.withColumn();
    const { result } = renderHook(() => useGetItemIds(COLUMN_TEST_ID), {
      wrapper,
    });
    expect(result.current).toEqual([ITEM_TEST_ID]);
  });
});
