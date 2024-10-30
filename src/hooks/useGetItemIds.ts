import { createSelector } from '@reduxjs/toolkit';
import { DatabaseKey } from 'src/constants';
import type { Id, RootState } from 'src/types';

import { useSelector } from './useSelector';

const selectColumnItemIds = createSelector(
  [
    (state: RootState) => state.columns,
    (state: RootState, columnId: Id) => columnId,
  ],
  (columns, columnId) => (columns[columnId] || {}).itemIds || [],
);

const selectRowItemIds = createSelector(
  [(state: RootState) => state.rows, (state: RootState, rowId: Id) => rowId],
  (rows, rowId) => (rows[rowId] || {}).itemIds || [],
);

/**
 * Get column or row item ids.
 *
 * @param key - Columns or rows.
 * @param id - Column or row id.
 * @returns - Item ids.
 */
export function useGetItemIds(
  key: DatabaseKey.columns | DatabaseKey.rows,
  id: Id,
): Id[] {
  return useSelector((state) => {
    switch (key) {
      case DatabaseKey.columns:
        return selectColumnItemIds(state, id);

      case DatabaseKey.rows:
        return selectRowItemIds(state, id);

      default:
        return [];
    }
  });
}
