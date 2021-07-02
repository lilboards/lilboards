import { reorderItems } from './reorder';

describe('reorderItems', () => {
  const items = ['1', '2', '3'];

  it('does nothing if start and end indexes are the same', () => {
    items.forEach((_, index) =>
      expect(reorderItems(items, index, index)).toBe(items)
    );
  });

  it('moves 1st item to 2nd position', () => {
    const startIndex = 0;
    const endIndex = 1;
    expect(reorderItems(items, startIndex, endIndex)).toEqual(['2', '1', '3']);
  });

  it('moves 2nd item to 3rd position', () => {
    const startIndex = 1;
    const endIndex = 2;
    expect(reorderItems(items, startIndex, endIndex)).toEqual(['1', '3', '2']);
  });

  it('moves 3rd item to 1st position', () => {
    const startIndex = 2;
    const endIndex = 0;
    expect(reorderItems(items, startIndex, endIndex)).toEqual(['3', '1', '2']);
  });
});
