import { renderHook } from '@testing-library/react';
import { DatabaseKey } from 'src/constants';
import { columnId, itemId, rowId } from 'test/constants';
import { updateStore, wrapper } from 'test/utils';

import { useGetItemIds } from './useGetItemIds';

it('returns empty array if key is invalid', () => {
  const { result } = renderHook(
    () => useGetItemIds('invalid' as DatabaseKey.columns, columnId),
    {
      wrapper,
    },
  );
  expect(result.current).toEqual([]);
});

describe('columns', () => {
  it('returns empty array when column is empty', () => {
    const { result } = renderHook(
      () => useGetItemIds(DatabaseKey.columns, columnId),
      {
        wrapper,
      },
    );
    expect(result.current).toEqual([]);
  });

  it('returns item ids when column exists', () => {
    updateStore.withColumn();
    const { result } = renderHook(
      () => useGetItemIds(DatabaseKey.columns, columnId),
      {
        wrapper,
      },
    );
    expect(result.current).toEqual([itemId]);
  });
});

describe('rows', () => {
  it('returns empty array when row is empty', () => {
    const { result } = renderHook(
      () => useGetItemIds(DatabaseKey.rows, rowId),
      {
        wrapper,
      },
    );
    expect(result.current).toEqual([]);
  });

  it('returns item ids when row exists', () => {
    updateStore.withRow();
    const { result } = renderHook(
      () => useGetItemIds(DatabaseKey.rows, rowId),
      {
        wrapper,
      },
    );
    expect(result.current).toEqual([itemId]);
  });
});
