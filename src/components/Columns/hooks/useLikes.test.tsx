import type { DataSnapshot } from 'firebase/database';
import { onValue } from 'firebase/database';
import { getLikesRef } from 'src/firebase';
import { Likes } from 'src/types';
import { boardId, itemId, userId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useLikes } from './useLikes';

const mockedOnValue = vi.mocked(onValue);

vi.mock('src/firebase');

function TestComponent() {
  useLikes(boardId);
  return null;
}

const unsubscribe = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  unsubscribe.mockClear();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe('likes snapshot value is valid', () => {
  beforeEach(() => {
    mockedOnValue.mockImplementationOnce((query, callback) => {
      const dataSnapshot = {
        val: (): Likes => ({
          items: {
            [itemId]: {
              [userId]: true,
            },
          },
        }),
      };
      callback(dataSnapshot as unknown as DataSnapshot);
      return unsubscribe;
    });
  });

  it('adds like to store', () => {
    updateStore.withUser();
    const { unmount } = renderWithProviders(<TestComponent />);

    expect(getLikesRef).toHaveBeenCalledTimes(1);
    expect(getLikesRef).toHaveBeenCalledWith(boardId);

    vi.runAllTimers();
    expect(onValue).toHaveBeenCalledTimes(1);
    expect(onValue).toHaveBeenCalledWith(undefined, expect.any(Function));

    expect(store.getState().likes).toEqual({
      items: {
        [itemId]: {
          user_test_id: true,
        },
      },
    });

    unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});

describe('likes snapshot value is null', () => {
  beforeEach(() => {
    mockedOnValue.mockImplementationOnce((query, callback) => {
      const dataSnapshot = { val: () => null };
      callback(dataSnapshot as unknown as DataSnapshot);
      return unsubscribe;
    });
  });

  it('resets likes in store', () => {
    updateStore.withUser();
    const { unmount } = renderWithProviders(<TestComponent />);

    expect(getLikesRef).toHaveBeenCalledTimes(1);
    expect(getLikesRef).toHaveBeenCalledWith(boardId);

    vi.runAllTimers();
    expect(onValue).toHaveBeenCalledTimes(1);
    expect(onValue).toHaveBeenCalledWith(undefined, expect.any(Function));
    expect(store.getState().likes).toEqual({
      items: {},
    });

    unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
