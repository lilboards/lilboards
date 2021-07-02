import { cloneArray } from './array';

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
