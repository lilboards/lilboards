import { getBackgroundColor } from './styles';

describe('getBackgroundColor', () => {
  it('returns hover color when dragging over', () => {
    const snapshot = {
      isDraggingOver: true,
      isUsingPlaceholder: true,
    };
    expect(getBackgroundColor(snapshot)).toBe('action.hover');
  });

  it('returns no color when not dragging over', () => {
    const snapshot = {
      isDraggingOver: false,
      isUsingPlaceholder: false,
    };
    expect(getBackgroundColor(snapshot)).toBe('');
  });
});
