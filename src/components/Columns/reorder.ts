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
  const reorderedItemIds = [...itemIds];
  const [removedItemId] = reorderedItemIds.splice(startIndex, 1);
  reorderedItemIds.splice(endIndex, 0, removedItemId);
  return reorderedItemIds;
}

export function reorderColumns(
  columns: Columns,
  source: DraggableLocation,
  destination: DraggableLocation
) {
  const currentColumnId = source.droppableId;
  const currentColumn = columns[currentColumnId];
  const currentItemIds = currentColumn.itemIds || [];

  const nextColumnId = destination.droppableId;

  // moving to the same column
  if (currentColumnId === nextColumnId) {
    return {
      [currentColumnId]: reorderItems(
        currentItemIds,
        source.index,
        destination.index
      ),
    };
  }

  return {};
}
