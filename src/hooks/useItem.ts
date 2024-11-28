import { createSelector } from '@reduxjs/toolkit';
import type { Id, Item, RootState } from 'src/types';

import { useSelector } from './useSelector';

const selectItem = createSelector(
  [(state: RootState) => state.items, (state: RootState, itemId: Id) => itemId],
  (items, itemId) => items[itemId],
);

/**
 * Get item by id.
 *
 * @param itemId - Item id.
 * @returns - Item data.
 */
export function useItem(itemId: Id): Item {
  return useSelector((state) => selectItem(state, itemId));
}
