import { createSelector } from '@reduxjs/toolkit';
import type { Id, RootState } from 'src/types';

import { useSelector } from './useSelector';

const selectLikes = createSelector(
  [
    (state: RootState) => state.likes.items,
    (state: RootState, itemId: Id) => itemId,
  ],
  (items, itemId) => items[itemId] || {},
);

/**
 * Get item likes by item id.
 *
 * @param itemId - Item id.
 * @returns - Item likes data.
 */
export function useLikes(itemId: Id) {
  return useSelector((state) => selectLikes(state, itemId));
}
