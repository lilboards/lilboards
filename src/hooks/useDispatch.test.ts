import { useDispatch as useReactReduxDispatch } from 'react-redux';

import { useDispatch } from './useDispatch';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

beforeEach(() => {
  (useReactReduxDispatch as jest.Mock).mockClear();
});

it('wraps react-redux useDispatch', () => {
  useDispatch();
  expect(useReactReduxDispatch).toBeCalledTimes(1);
});
