import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'src/types';

import { useSelector } from './useSelector';

const selectUserId = createSelector(
  (state: RootState) => state.user,
  (user) => /* istanbul ignore next */ user?.photoURL,
);

/**
 * Get user's photo URL.
 */
export function useGetUserPhotoURL() {
  return useSelector(selectUserId);
}
