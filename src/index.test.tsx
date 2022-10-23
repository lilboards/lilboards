import { act } from '@testing-library/react';
import type { Root } from 'react-dom/client';

let div: HTMLDivElement;
let getElementByIdSpy: jest.SpyInstance;
let root: Root;

beforeEach(() => {
  div = document.createElement('div');
  getElementByIdSpy = jest
    .spyOn(document, 'getElementById')
    .mockReturnValueOnce(div);
});

it('renders without crashing', () => {
  expect(getElementByIdSpy).not.toBeCalled();
  act(() => {
    root = require('.').root;
  });
  expect(getElementByIdSpy).toBeCalledTimes(1);
  expect(getElementByIdSpy).toBeCalledWith('root');
});

afterAll(() => {
  getElementByIdSpy.mockRestore();
  root.unmount();
});
