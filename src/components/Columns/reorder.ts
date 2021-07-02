import { ITEM_IDS } from '../../constants';
import { cloneArray } from '../../utils';

import type { DraggableLocation } from 'react-beautiful-dnd';
import type { Columns, Id } from '../../types';

export function reorderItems(
  itemIds: Id[],
  startIndex: number,
  endIndex: number
) {
  if (startIndex === endIndex) {
    return itemIds;
  }
  const reorderedItemIds = cloneArray(itemIds);
  const [removedItemId] = reorderedItemIds.splice(startIndex, 1);
  reorderedItemIds.splice(endIndex, 0, removedItemId);
  return reorderedItemIds;
}

export function reorderColumns(
  columns: Columns,
  source: DraggableLocation,
  destination: DraggableLocation
) {
  const sourceColumnId = source.droppableId;
  const sourceColumn = columns[sourceColumnId] || {};
  const sourceItemIds = cloneArray(sourceColumn[ITEM_IDS]);

  const destinationColumnId = destination.droppableId;
  const destinationColumn = columns[destinationColumnId] || {};
  const destinationItemIds = cloneArray(destinationColumn[ITEM_IDS]);

  // moving item to the same column
  if (sourceColumnId === destinationColumnId) {
    return {
      [sourceColumnId]: reorderItems(
        sourceItemIds,
        source.index,
        destination.index
      ),
    };
    // moving item to a different column
  } else {
    // insert item into the next column and remove item from the original column
    const targetItemId = sourceItemIds[source.index];
    destinationItemIds.splice(destination.index, 0, targetItemId);
    sourceItemIds.splice(source.index, 1);

    return {
      [sourceColumnId]: sourceItemIds,
      [destinationColumnId]: destinationItemIds,
    };
  }
}
