import { createSelector } from '@reduxjs/toolkit';

import type { Id, RootState } from '../types';
import { useSelector } from './useSelector';

const selectUserId = createSelector(
  (state: RootState) => state.user,
  (user) => user?.id || '',
);

/**
 * Get user id.
 */
export function useGetUserId(): Id {
  return useSelector(selectUserId);
}
