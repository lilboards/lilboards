import * as hooks from '.';

it.each(['useItems', 'useRows'] as const)('exports %s', (hookName) => {
  expect(hooks[hookName]).toBeInstanceOf(Function);
});
