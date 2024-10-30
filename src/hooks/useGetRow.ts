import { createSelector } from '@reduxjs/toolkit';
import type { Id, RootState } from 'src/types';

import { useSelector } from './useSelector';

const selectRow = createSelector(
  [(state: RootState) => state.rows, (state: RootState, rowId: Id) => rowId],
  (rows, rowId) => rows[rowId],
);

/**
 * Get row by id.
 */
export function useGetRow(rowId: Id) {
  return useSelector((state) => selectRow(state, rowId));
}
