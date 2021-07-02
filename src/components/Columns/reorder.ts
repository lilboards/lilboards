import type { Id } from '../../types';

export function reorderItems(
  itemIds: Id[],
  startIndex: number,
  endIndex: number
) {
  if (startIndex === endIndex) {
    return itemIds;
  }
  const reorderedItemIds = [...itemIds];
  const [removedItemId] = reorderedItemIds.splice(startIndex, 1);
  reorderedItemIds.splice(endIndex, 0, removedItemId);
  return reorderedItemIds;
}
