import { createSelector } from '@reduxjs/toolkit';
import { DatabaseKey } from 'src/constants';
import type { Id, RootState } from 'src/types';

import { useSelector } from './useSelector';

const emptyItemIds: Id[] = [];

const selectColumnItemIds = createSelector(
  [
    (state: RootState) => state.columns,
    (state: RootState, columnId: Id) => columnId,
  ],
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  (columns, columnId) => columns[columnId]?.itemIds ?? emptyItemIds,
);

const selectRowItemIds = createSelector(
  [(state: RootState) => state.rows, (state: RootState, rowId: Id) => rowId],
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  (rows, rowId) => rows[rowId]?.itemIds ?? emptyItemIds,
);

/**
 * Get column or row item ids.
 *
 * @param key - Columns or rows.
 * @param id - Column or row id.
 * @returns - Item ids.
 */
export function useItemIds(
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
        return emptyItemIds;
    }
  });
}
