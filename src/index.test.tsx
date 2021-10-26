import { act } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

let div: HTMLDivElement;
let getElementByIdSpy: jest.SpyInstance;

beforeEach(() => {
  div = document.createElement('div');
  getElementByIdSpy = jest
    .spyOn(document, 'getElementById')
    .mockReturnValueOnce(div);
});

it('renders without crashing', () => {
  expect(getElementByIdSpy).not.toBeCalled();
  act(() => {
    require('.');
  });
  expect(getElementByIdSpy).toBeCalledTimes(1);
  expect(getElementByIdSpy).toBeCalledWith('root');
});

afterAll(() => {
  getElementByIdSpy.mockRestore();
  unmountComponentAtNode(div);
});
