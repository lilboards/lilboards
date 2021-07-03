import { getBackgroundColor } from './styles';

describe('getBackgroundColor', () => {
  it('returns bgcolor when dragging over', () => {
    const snapshot = {
      isDraggingOver: true,
      isUsingPlaceholder: true,
    };
    expect(getBackgroundColor(snapshot)).toBe('grey.200');
  });

  it('returns null when not dragging over', () => {
    const snapshot = {
      isDraggingOver: false,
      isUsingPlaceholder: false,
    };
    expect(getBackgroundColor(snapshot)).toBe(null);
  });
});
