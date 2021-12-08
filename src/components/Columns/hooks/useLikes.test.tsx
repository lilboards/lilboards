import { onValue } from 'firebase/database';

import {
  BOARD_TEST_ID as boardId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../../../constants/test';
import { getLikesRef } from '../../../firebase';
import { Likes } from '../../../types';
import { renderWithContext, store, updateStore } from '../../../utils/test';
import { useLikes } from './useLikes';

jest.mock('firebase/database', () => ({
  onValue: jest.fn(),
}));

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

afterAll(() => {
  jest.useRealTimers();
});

describe('likes snapshot value is valid', () => {
  beforeEach(() => {
    (onValue as jest.Mock).mockImplementationOnce((query, callback) => {
      callback({
        val: (): Likes => ({
          items: {
            [itemId]: {
              [userId]: true,
            },
          },
        }),
      });
      return unsubscribe;
    });
  });

  it('adds like to store', () => {
    updateStore.withUser();
    const { unmount } = renderWithContext(<TestComponent />);

    expect(getLikesRef).toBeCalledTimes(1);
    expect(getLikesRef).toBeCalledWith(boardId);

    jest.runAllTimers();
    expect(onValue).toBeCalledTimes(1);
    expect(onValue).toBeCalledWith(undefined, expect.any(Function));

    expect(store.getState().likes).toMatchInlineSnapshot(`
      Object {
        "items": Object {
          "item_test_id": Object {
            "user_test_id": true,
          },
        },
      }
    `);

    unmount();
    expect(unsubscribe).toBeCalledTimes(1);
  });
});

describe('likes snapshot value is null', () => {
  beforeEach(() => {
    (onValue as jest.Mock).mockImplementationOnce((query, callback) => {
      callback({
        val: () => null,
      });
      return unsubscribe;
    });
  });

  it('resets likes in store', () => {
    updateStore.withUser();
    const { unmount } = renderWithContext(<TestComponent />);

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
