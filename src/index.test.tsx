import { act } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

it('renders without crashing', async () => {
  const getElementByIdSpy = vi
    .spyOn(document, 'getElementById')
    .mockReturnValueOnce(document.createElement('div'));

  await act(async () => {
    const rootModule = (await import('.')) as {
      root: { unmount: () => void };
    };
    rootModule.root.unmount();
  });

  expect(getElementByIdSpy).toHaveBeenCalledTimes(1);
  expect(getElementByIdSpy).toHaveBeenCalledWith('root');
  getElementByIdSpy.mockRestore();
});
