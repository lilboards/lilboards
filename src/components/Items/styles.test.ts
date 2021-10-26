import type { Theme } from '@material-ui/core/styles';

import { getDraggableCardStyle, getDroppableBackgroundColor } from './styles';

describe('getDraggableCardStyle', () => {
  const theme = {
    palette: {
      info: {
        light: '#64b5f6',
      },
    },
  } as Theme;

  it('returns style when combining with another draggable', () => {
    const draggableSnapshot = {
      combineWith: '~MhA3yYzzy6qb6iH8lMX',
      isDragging: true,
      isDropAnimating: true,
    };
    expect(getDraggableCardStyle(draggableSnapshot, theme)).toEqual({
      backgroundColor: theme.palette.info.light,
    });
  });

  it('returns undefined when not combining', () => {
    const draggableSnapshot = {
      isDragging: true,
      isDropAnimating: true,
    };
    expect(getDraggableCardStyle(draggableSnapshot, theme)).toBe(undefined);
  });
});

describe('getDroppableBackgroundColor', () => {
  it('returns hover color when dragging over', () => {
    const droppableSnapshot = {
      isDraggingOver: true,
      isUsingPlaceholder: true,
    };
    expect(getDroppableBackgroundColor(droppableSnapshot)).toBe('action.hover');
  });

  it('returns no color when not dragging over', () => {
    const droppableSnapshot = {
      isDraggingOver: false,
      isUsingPlaceholder: false,
    };
    expect(getDroppableBackgroundColor(droppableSnapshot)).toBe(null);
  });
});
