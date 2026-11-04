import { noop } from './function';

describe('noop', () => {
  it('returns undefined', () => {
    expect(noop).toBeInstanceOf(Function);
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    expect(noop()).toBe(undefined);
  });
});
