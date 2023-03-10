import { renderHook } from '@testing-library/react';
import {
  shallowEqual,
  useSelector as useReactReduxSelector,
} from 'react-redux';

import { useSelector } from './useSelector';

jest.mock('react-redux', () => ({
  shallowEqual: jest.fn(),
  useSelector: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

it('wraps react-redux useSelector with shallowEqual', () => {
  const selector = jest.fn();
  const { result } = renderHook(() => useSelector(selector));
  expect(result.current).toBe(undefined);
  expect(useReactReduxSelector).toBeCalledTimes(1);
  expect(useReactReduxSelector).toBeCalledWith(selector, shallowEqual);
});
