import { createSelector } from '@reduxjs/toolkit';
import type { Id, RootState } from 'src/types';

import { useSelector } from './useSelector';

const selectRowIds = createSelector(
  [(state: RootState) => state.rows],
  (rows) => Object.keys(rows),
);

/**
 * Get row ids.
 *
 * @returns - Row ids.
 */
export function useGetRowIds(): Id[] {
  return useSelector(selectRowIds);
}
