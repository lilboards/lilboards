import type { DroppableStateSnapshot } from '@hello-pangea/dnd';
import { grey } from '@mui/material/colors';

import { getDroppableBackgroundColor } from './styles';

describe('getDroppableBackgroundColor', () => {
  it('returns hover color when dragging over', () => {
    const droppableSnapshot = {
      isDraggingOver: true,
      isUsingPlaceholder: true,
    } as DroppableStateSnapshot;
    expect(getDroppableBackgroundColor(droppableSnapshot)).toBe(grey[100]);
  });

  it('returns no color when not dragging over', () => {
    const droppableSnapshot = {
      isDraggingOver: false,
      isUsingPlaceholder: false,
    } as DroppableStateSnapshot;
    expect(getDroppableBackgroundColor(droppableSnapshot)).toBe(undefined);
  });
});
