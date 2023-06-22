import { createSelector } from '@reduxjs/toolkit';

import type { Id, RootState } from '../types';
import { useSelector } from './useSelector';

const selectItemIds = createSelector(
  (state: RootState) => state.columns,
  (_: unknown, columnId: Id) => columnId,
  (columns, columnId) => (columns[columnId] || {}).itemIds || []
);

/**
 * Get item ids.
 */
export function useGetItemIds(columnId: Id) {
  return useSelector((state) => selectItemIds(state, columnId));
}
