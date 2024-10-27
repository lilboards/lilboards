import { renderHook } from '@testing-library/react';
import { useDispatch as useReactReduxDispatch } from 'react-redux';

import { useDispatch } from './useDispatch';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

it('wraps react-redux useDispatch', () => {
  const { result } = renderHook(() => useDispatch());
  expect(result.current).toBe(undefined);
  expect(useReactReduxDispatch).toHaveBeenCalledTimes(1);
});
