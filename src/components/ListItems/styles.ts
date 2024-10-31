import type { DroppableStateSnapshot } from '@hello-pangea/dnd';
import { grey } from '@mui/material/colors';

/**
 * Gets droppable background color.
 *
 * @see {@link https://github.com/hello-pangea/dnd/blob/main/docs/api/droppable.md#recommended--home-list-styling}
 */
export const getDroppableBackgroundColor = (
  droppableSnapshot: DroppableStateSnapshot,
) => {
  if (droppableSnapshot.isDraggingOver) {
    return grey[100];
  }
};
