import { unmountComponentAtNode } from 'react-dom';
import { act } from '@testing-library/react';

let div: HTMLDivElement;
let getElementByIdSpy: jest.SpyInstance;

beforeEach(() => {
  div = document.createElement('div');
  getElementByIdSpy = jest
    .spyOn(document, 'getElementById')
    .mockReturnValueOnce(div);
});

it('renders without crashing', () => {
  expect(getElementByIdSpy).not.toHaveBeenCalled();
  act(() => {
    require('.');
  });
  expect(getElementByIdSpy).toHaveBeenCalledTimes(1);
  expect(getElementByIdSpy).toHaveBeenCalledWith('root');
});

afterAll(() => {
  getElementByIdSpy.mockRestore();
  unmountComponentAtNode(div);
});
