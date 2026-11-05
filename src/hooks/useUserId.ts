import { createSelector } from '@reduxjs/toolkit';
import type { Id, RootState } from 'src/types';

import { useSelector } from './useSelector';

const selectUserId = createSelector(
  [(state: RootState) => state.user],
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  (user) => /* v8 ignore next */ user?.id ?? '',
);

/**
 * Get user id.
 *
 * @returns - User id.
 */
export function useUserId(): Id {
  return useSelector(selectUserId);
}
