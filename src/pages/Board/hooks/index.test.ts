import * as hooks from '.';

it.each(['useBoard'] as const)('exports %s', (hookName) => {
  expect(hooks[hookName]).toBeInstanceOf(Function);
});
