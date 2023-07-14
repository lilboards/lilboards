import { createSelector } from '@reduxjs/toolkit';

import type { Id, RootState } from '../types';
import { useSelector } from './useSelector';

const selectLikes = createSelector(
  (state: RootState) => state.likes.items,
  (_: unknown, itemId: Id) => itemId,
  (items, itemId) => items[itemId] || {},
);

/**
 * Get item likes.
 *
 * @param itemId - Item id.
 */
export function useGetLikes(itemId: Id) {
  return useSelector((state) => selectLikes(state, itemId));
}
