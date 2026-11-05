import { expect, it } from 'vitest';

import * as hooks from '.';

it.each(['useList'] as const)('exports %s', (hookName) => {
  expect(hooks[hookName]).toBeInstanceOf(Function);
});
