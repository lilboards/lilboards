import { createSelector } from '@reduxjs/toolkit';
import type { Id, RootState, User } from 'src/types';

import { useSelector } from './useSelector';

type Key = keyof User['editing'];

const selectUserEditing = createSelector(
  [
    (state: RootState) => state.user.editing,
    (state: RootState, key: Key) => key,
    (state: RootState, key: Key, id: Id) => id,
  ],
  (editing, key, id) => editing[key] === id,
);

/**
 * Check if user is editing.
 */
export function useIsEditing(key: Key, id: Id): boolean {
  return useSelector((state) => selectUserEditing(state, key, id));
}
