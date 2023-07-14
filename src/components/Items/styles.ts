import type { Theme } from '@mui/material/styles';
import type {
  DraggableStateSnapshot,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';

/**
 * Gets draggable card style.
 *
 * @see {@link https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/drop-animation.md}
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
 * @see {@link https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md#recommended--home-list-styling}
 */
export const getDroppableBackgroundColor = (
  droppableSnapshot: DroppableStateSnapshot,
) => {
  if (droppableSnapshot.isDraggingOver) {
    return '#eee';
  }
};
