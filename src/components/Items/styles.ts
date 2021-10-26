import type { Theme } from '@material-ui/core/styles';
import type {
  DraggableStateSnapshot,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';

/**
 * Gets draggable card style.
 *
 * @see {@link https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/drop-animation.md}
 * @see {@link https://material-ui.com/customization/palette/}
 */
export const getDraggableCardStyle = (
  draggableSnapshot: DraggableStateSnapshot,
  theme: Theme
) => {
  if (draggableSnapshot.combineWith) {
    return {
      backgroundColor: theme.palette.info.light,
    };
  }
};

/**
 * Gets droppable background color.
 *
 * @see {@link https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md#recommended--home-list-styling}
 * @see {@link https://material-ui.com/customization/palette/}
 */
export const getDroppableBackgroundColor = (
  droppableSnapshot: DroppableStateSnapshot
) => {
  if (droppableSnapshot.isDraggingOver) {
    return 'action.hover';
  }
  return null; // 'background.default'
};
