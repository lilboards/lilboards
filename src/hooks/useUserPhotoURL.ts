import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'src/types';

import { useSelector } from './useSelector';

const selectUserId = createSelector(
  [(state: RootState) => state.user],
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  (user) => /* v8 ignore next */ user?.photoURL,
);

/**
 * Get user's photo URL.
 *
 * @returns - User photo URL.
 */
export function useUserPhotoURL(): string | null {
  return useSelector(selectUserId);
}
