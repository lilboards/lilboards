import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'src/types';

import { useSelector } from './useSelector';

const selectUserEmail = createSelector(
  [(state: RootState) => state.user],
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  (user) => Boolean(/* istanbul ignore next */ user?.email),
);

/**
 * Is user logged in hook.
 *
 * @returns - Whether user is logged in with email.
 */
export function useIsLoggedIn(): boolean {
  return useSelector(selectUserEmail);
}
