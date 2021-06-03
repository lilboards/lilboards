import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import { useDispatch, useSelector } from '.';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('useDispatch', () => {
  it('wraps react-redux useDispatch', () => {
    useDispatch();
    expect(useReduxDispatch).toHaveBeenCalledTimes(1);
  });
});

describe('useSelector', () => {
  it('is equivalent to react-redux useSelector', () => {
    expect(useSelector).toBe(useReduxSelector);
  });
});
