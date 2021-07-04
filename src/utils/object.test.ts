import { countObject } from './object';

describe('countObject', () => {
  it('returns 0 for undefined', () => {
    expect(countObject()).toBe(0);
  });

  it('returns object length', () => {
    expect(countObject({ 1: 1 })).toBe(1);
    expect(countObject({ 1: 1, 2: 2 })).toBe(2);
  });
});
