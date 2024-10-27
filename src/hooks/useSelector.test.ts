import { renderHook } from '@testing-library/react';
import { useSelector as useReactReduxSelector } from 'react-redux';

import { useSelector } from './useSelector';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

it('returns react-redux useSelector', () => {
  const selector = jest.fn();
  const { result } = renderHook(() => useSelector(selector));
  expect(result.current).toBe(undefined);
  expect(useReactReduxSelector).toHaveBeenCalledTimes(1);
  expect(useReactReduxSelector).toHaveBeenCalledWith(selector);
});
