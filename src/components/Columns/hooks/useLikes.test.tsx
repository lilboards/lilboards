import { onValue } from 'firebase/database';

import {
  BOARD_TEST_ID as boardId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../../../constants/test';
import { getLikesRef } from '../../../firebase';
import { Likes } from '../../../types';
import { renderWithProviders, store, updateStore } from '../../../utils/test';
import { useLikes } from './useLikes';

const mockedOnValue = jest.mocked(onValue);

jest.mock('../../../firebase', () => ({
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

    expect(getLikesRef).toBeCalledTimes(1);
    expect(getLikesRef).toBeCalledWith(boardId);

    jest.runAllTimers();
    expect(onValue).toBeCalledTimes(1);
    expect(onValue).toBeCalledWith(undefined, expect.any(Function));

    expect(store.getState().likes).toEqual({
      items: {
        item_test_id: {
          user_test_id: true,
        },
      },
    });

    unmount();
    expect(unsubscribe).toBeCalledTimes(1);
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

    expect(getLikesRef).toBeCalledTimes(1);
    expect(getLikesRef).toBeCalledWith(boardId);

    jest.runAllTimers();
    expect(onValue).toBeCalledTimes(1);
    expect(onValue).toBeCalledWith(undefined, expect.any(Function));
    expect(store.getState().likes).toEqual({
      items: {},
    });

    unmount();
    expect(unsubscribe).toBeCalledTimes(1);
  });
});
