import { act } from '@testing-library/react';

it('renders without crashing', () => {
  const getElementByIdSpy = jest
    .spyOn(document, 'getElementById')
    .mockReturnValueOnce(document.createElement('div'));

  act(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const rootModule = require('.') as { root: { unmount: () => void } };
    rootModule.root.unmount();
  });

  expect(getElementByIdSpy).toHaveBeenCalledTimes(1);
  expect(getElementByIdSpy).toHaveBeenCalledWith('root');
  getElementByIdSpy.mockRestore();
});
