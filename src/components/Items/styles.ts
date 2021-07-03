import type { DroppableStateSnapshot } from 'react-beautiful-dnd';

// https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md#recommended--home-list-styling
export const getBackgroundColor = (snapshot: DroppableStateSnapshot) =>
  snapshot.isDraggingOver ? 'grey.200' : null;
