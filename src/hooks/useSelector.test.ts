import { renderHook } from '@testing-library/react';
import { useSelector as useReactReduxSelector } from 'react-redux';
import { beforeEach, expect, it, vi } from 'vitest';

import { useSelector } from './useSelector';

vi.mock('react-redux');

beforeEach(() => {
  vi.clearAllMocks();
});

it('returns react-redux useSelector', () => {
  const selector = vi.fn();
  const { result } = renderHook(
    () => useSelector(selector) as unknown as undefined,
  );
  expect(result.current).toBe(undefined);
  expect(useReactReduxSelector).toHaveBeenCalledTimes(1);
  expect(useReactReduxSelector).toHaveBeenCalledWith(selector);
});
