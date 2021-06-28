import {
  shallowEqual,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import { useDispatch, useSelector } from '.';

jest.mock('react-redux', () => ({
  shallowEqual: jest.fn(),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

beforeEach(() => {
  (shallowEqual as jest.Mock).mockClear();
  (useReduxDispatch as jest.Mock).mockClear();
  (useReduxSelector as jest.Mock).mockClear();
});

describe('useDispatch', () => {
  it('wraps react-redux useDispatch', () => {
    useDispatch();
    expect(useReduxDispatch).toBeCalledTimes(1);
  });
});

describe('useSelector', () => {
  it('wraps react-redux useSelector with shallowEqual', () => {
    const selector = jest.fn();
    useSelector(selector);
    expect(useReduxSelector).toBeCalledTimes(1);
    expect(useReduxSelector).toBeCalledWith(selector, shallowEqual);
  });
});
