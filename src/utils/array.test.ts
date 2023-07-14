import { cloneArray, reorderArray } from './array';

describe('cloneArray', () => {
  it('returns empty array for undefined', () => {
    expect(cloneArray()).toEqual([]);
  });

  it('returns shallow clone', () => {
    const array = [1, 2, 3];
    expect(cloneArray(array)).not.toBe(array);
    expect(cloneArray(array)).toEqual(array);
  });
});

describe('reorderArray', () => {
  const items = ['1', '2', '3'];

  it('does nothing if start and end indexes are the same', () => {
    items.forEach((_, index) =>
      expect(reorderArray(items, index, index)).toBe(items),
    );
  });

  it('moves 1st item to 2nd position', () => {
    const startIndex = 0;
    const endIndex = 1;
    expect(reorderArray(items, startIndex, endIndex)).toEqual(['2', '1', '3']);
  });

  it('moves 2nd item to 3rd position', () => {
    const startIndex = 1;
    const endIndex = 2;
    expect(reorderArray(items, startIndex, endIndex)).toEqual(['1', '3', '2']);
  });

  it('moves 3rd item to 1st position', () => {
    const startIndex = 2;
    const endIndex = 0;
    expect(reorderArray(items, startIndex, endIndex)).toEqual(['3', '1', '2']);
  });
});
