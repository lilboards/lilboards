import { renderHook } from '@testing-library/react';
import { useDispatch as useReactReduxDispatch } from 'react-redux';
import { beforeEach, expect, it, vi } from 'vitest';

import { useDispatch } from './useDispatch';

vi.mock('react-redux');

beforeEach(() => {
  vi.clearAllMocks();
});

it('wraps react-redux useDispatch', () => {
  const { result } = renderHook(() => useDispatch());
  expect(result.current).toBe(undefined);
  expect(useReactReduxDispatch).toHaveBeenCalledTimes(1);
});
