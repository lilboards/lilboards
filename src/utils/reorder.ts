import type { DraggableLocation } from '@hello-pangea/dnd';
import { DatabaseKey } from 'src/constants';
import type { Columns } from 'src/types';
import { cloneArray, reorderArray } from 'src/utils';

export function reorder(
  source: DraggableLocation,
  destination: DraggableLocation,
  columns: Columns,
) {
  const sourceColumnId = source.droppableId;
  const sourceColumn = columns[sourceColumnId] || {};
  const sourceItemIds = cloneArray(sourceColumn[DatabaseKey.itemIds]);

  const destinationColumnId = destination.droppableId;
  const destinationColumn = columns[destinationColumnId] || {};
  const destinationItemIds = cloneArray(destinationColumn[DatabaseKey.itemIds]);

  // moving item to the same column
  if (sourceColumnId === destinationColumnId) {
    return {
      [sourceColumnId]: reorderArray(
        sourceItemIds,
        source.index,
        destination.index,
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
