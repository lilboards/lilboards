import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../types';
import { useSelector } from './useSelector';

const selectUserId = createSelector(
  (state: RootState) => state.user,
  (user) => user?.id || ''
);

/**
 * Get user id.
 */
export function useGetUserId() {
  return useSelector(selectUserId);
}
