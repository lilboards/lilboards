import { act } from '@testing-library/react';

it('renders without crashing', () => {
  const getElementByIdSpy = jest
    .spyOn(document, 'getElementById')
    .mockReturnValueOnce(document.createElement('div'));

  act(() => {
    const { root } = require('.');
    root.unmount();
  });

  expect(getElementByIdSpy).toBeCalledTimes(1);
  expect(getElementByIdSpy).toBeCalledWith('root');
  getElementByIdSpy.mockRestore();
});
