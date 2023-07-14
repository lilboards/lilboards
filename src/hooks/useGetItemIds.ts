import { createSelector } from '@reduxjs/toolkit';

import type { Id, RootState } from '../types';
import { useSelector } from './useSelector';

const selectItemIds = createSelector(
  (state: RootState) => state.columns,
  (_: unknown, columnId: Id) => columnId,
  (columns, columnId) => (columns[columnId] || {}).itemIds || [],
);

/**
 * Get column item ids.
 *
 * @param columnId - Column id.
 */
export function useGetItemIds(columnId: Id): Id[] {
  return useSelector((state) => selectItemIds(state, columnId));
}
