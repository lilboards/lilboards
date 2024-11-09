import { createSelector } from '@reduxjs/toolkit';
import type { Id, RootState } from 'src/types';

import { useSelector } from './useSelector';

const selectUserId = createSelector(
  [(state: RootState) => state.user],
  (user) => /* istanbul ignore next */ user?.id || '',
);

/**
 * Get user id.
 *
 * @returns - User id.
 */
export function useGetUserId(): Id {
  return useSelector(selectUserId);
}
