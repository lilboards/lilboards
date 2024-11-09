import { createSelector } from '@reduxjs/toolkit';
import type { Id, RootState, Row } from 'src/types';

import { useSelector } from './useSelector';

const selectRow = createSelector(
  [(state: RootState) => state.rows, (state: RootState, rowId: Id) => rowId],
  (rows, rowId) => rows[rowId],
);

/**
 * Get row by id.
 *
 * @param rowId - Row id.
 * @returns - Row data.
 */
export function useGetRow(rowId: Id): Row {
  return useSelector((state) => selectRow(state, rowId));
}
