import { describe, expect, it } from 'vitest';

import { generateId } from './id';

describe('generateId', () => {
  it('generates a database reference key', () => {
    const id = generateId();
    expect(typeof id).toBe('string');
    expect(id).toHaveLength(20);
  });
});
