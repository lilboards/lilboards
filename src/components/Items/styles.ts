import type {
  DraggableStateSnapshot,
  DroppableStateSnapshot,
} from '@hello-pangea/dnd';
import type { Theme } from '@mui/material/styles';

/**
 * Gets draggable card style.
 *
 * @see {@link https://github.com/hello-pangea/dnd/blob/main/docs/guides/drop-animation.md}
 * @see {@link https://mui.com/customization/palette/}
 */
export const getDraggableCardStyle = (
  draggableSnapshot: DraggableStateSnapshot,
  theme: Theme,
) => {
  if (draggableSnapshot.combineWith) {
    return {
      backgroundColor: theme.palette.primary.light,
    };
  }
};

/**
 * Gets droppable background color.
 *
 * @see {@link https://github.com/hello-pangea/dnd/blob/main/docs/api/droppable.md#recommended--home-list-styling}
 */
export const getDroppableBackgroundColor = (
  droppableSnapshot: DroppableStateSnapshot,
) => {
  if (droppableSnapshot.isDraggingOver) {
    return '#eee';
  }
};
