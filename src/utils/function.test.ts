import { noop } from './function';

describe('noop', () => {
  it('returns undefined', () => {
    expect(noop).toBeInstanceOf(Function);
    expect(noop()).toBe(undefined);
  });
});
