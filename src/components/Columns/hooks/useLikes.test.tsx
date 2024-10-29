import { onValue } from 'firebase/database';
import { getLikesRef } from 'src/firebase';
import { Likes } from 'src/types';
import { boardId, itemId, userId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';

import { useLikes } from './useLikes';

const mockedOnValue = jest.mocked(onValue);

jest.mock('src/firebase', () => ({
  getLikesRef: jest.fn(),
}));

function TestComponent() {
  useLikes(boardId);
  return null;
}

const unsubscribe = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  unsubscribe.mockClear();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
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
      callback(dataSnapshot as any);
      return unsubscribe;
    });
  });

  it('adds like to store', () => {
    updateStore.withUser();
    const { unmount } = renderWithProviders(<TestComponent />);

    expect(getLikesRef).toHaveBeenCalledTimes(1);
    expect(getLikesRef).toHaveBeenCalledWith(boardId);

    jest.runAllTimers();
    expect(onValue).toHaveBeenCalledTimes(1);
    expect(onValue).toHaveBeenCalledWith(undefined, expect.any(Function));

    expect(store.getState().likes).toEqual({
      items: {
        item_test_id: {
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
      callback(dataSnapshot as any);
      return unsubscribe;
    });
  });

  it('resets likes in store', () => {
    updateStore.withUser();
    const { unmount } = renderWithProviders(<TestComponent />);

    expect(getLikesRef).toHaveBeenCalledTimes(1);
    expect(getLikesRef).toHaveBeenCalledWith(boardId);

    jest.runAllTimers();
    expect(onValue).toHaveBeenCalledTimes(1);
    expect(onValue).toHaveBeenCalledWith(undefined, expect.any(Function));
    expect(store.getState().likes).toEqual({
      items: {},
    });

    unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
