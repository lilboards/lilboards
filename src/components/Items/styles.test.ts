import type {
  DraggableStateSnapshot,
  DroppableStateSnapshot,
} from '@hello-pangea/dnd';
import { grey } from '@mui/material/colors';
import type { Theme } from '@mui/material/styles';

import { getDraggableCardStyle, getDroppableBackgroundColor } from './styles';

describe('getDraggableCardStyle', () => {
  const theme = {
    palette: {
      primary: {
        light: '#42a5f5',
      },
    },
  } as Theme;

  it('returns style when combining with another draggable', () => {
    const draggableSnapshot = {
      combineWith: '~MhA3yYzzy6qb6iH8lMX',
      isDragging: true,
      isDropAnimating: true,
    } as DraggableStateSnapshot;
    expect(getDraggableCardStyle(draggableSnapshot, theme)).toEqual({
      backgroundColor: theme.palette.primary.light,
    });
  });

  it('returns undefined when not combining', () => {
    const draggableSnapshot = {
      isDragging: true,
      isDropAnimating: true,
    } as DraggableStateSnapshot;
    expect(getDraggableCardStyle(draggableSnapshot, theme)).toBe(undefined);
  });
});

describe('getDroppableBackgroundColor', () => {
  it('returns hover color when dragging over', () => {
    const droppableSnapshot = {
      isDraggingOver: true,
      isUsingPlaceholder: true,
    } as DroppableStateSnapshot;
    expect(getDroppableBackgroundColor(droppableSnapshot)).toBe(grey[200]);
  });

  it('returns no color when not dragging over', () => {
    const droppableSnapshot = {
      isDraggingOver: false,
      isUsingPlaceholder: false,
    } as DroppableStateSnapshot;
    expect(getDroppableBackgroundColor(droppableSnapshot)).toBe(undefined);
  });
});
