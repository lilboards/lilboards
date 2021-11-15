import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from 'firebase/database';

import {
  BOARD_TEST_ID as boardId,
  DATE_NOW as dateNow,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../../../constants/test';
import { getItemsRef } from '../../../firebase';
import { Item } from '../../../types';
import {
  getStoreState,
  renderWithContext,
  updateStore,
} from '../../../utils/test';
import { useItems } from './useItems';

jest.mock('firebase/database', () => ({
  onChildAdded: jest.fn(),
  onChildChanged: jest.fn(),
  onChildRemoved: jest.fn(),
}));

jest.mock('../../../firebase', () => ({
  getItemsRef: jest.fn(),
}));

function TestComponent() {
  useItems(boardId);
  return null;
}

const itemText = 'Item text';
const itemsRef = 'itemsRef';

const unsubscribeOnChildAdded = jest.fn();
const unsubscribeOnChildChanged = jest.fn();
const unsubscribeOnChildRemoved = jest.fn();

afterAll(() => {
  jest.useRealTimers();
});

beforeEach(() => {
  jest.useFakeTimers();
  (getItemsRef as jest.Mock).mockReturnValueOnce(itemsRef);
  (onChildAdded as jest.Mock).mockImplementationOnce((query, callback) => {
    callback({ val: () => null });
    return unsubscribeOnChildAdded;
  });
  (onChildChanged as jest.Mock).mockImplementationOnce((query, callback) => {
    callback({ val: () => null });
    return unsubscribeOnChildChanged;
  });
  (onChildRemoved as jest.Mock).mockImplementationOnce((query, callback) => {
    callback({});
    return unsubscribeOnChildRemoved;
  });
  [
    unsubscribeOnChildAdded,
    unsubscribeOnChildChanged,
    unsubscribeOnChildRemoved,
  ].forEach((mock) => mock.mockClear());
});

describe('onChildAdded', () => {
  beforeEach(() => {
    (onChildAdded as jest.Mock)
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        callback({
          val: (): Item => ({
            createdAt: dateNow,
            createdBy: userId,
            text: itemText,
          }),
          key: itemId,
        });
        return unsubscribeOnChildAdded;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithContext(<TestComponent />);
    expect(getItemsRef).toBeCalledTimes(1);
    expect(getItemsRef).toBeCalledWith(boardId);
    expect(onChildAdded).toBeCalledTimes(1);
    expect(onChildAdded).toBeCalledWith(itemsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildAdded).toBeCalledTimes(1);
  });

  it('adds item to store', () => {
    renderWithContext(<TestComponent />);
    jest.runAllTimers();
    expect(getStoreState().items).toMatchInlineSnapshot(`
      Object {
        "item_test_id": Object {
          "createdAt": 1234567890,
          "createdBy": "user_test_id",
          "text": "Item text",
        },
      }
    `);
  });

  it('does not add item when itemId is invalid', () => {
    (onChildAdded as jest.Mock)
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        callback({
          val: () => null,
          key: null,
        });
        return unsubscribeOnChildAdded;
      });
    renderWithContext(<TestComponent />);
    jest.runAllTimers();
    expect(getStoreState().items).toEqual({});
  });
});

describe('onChildChanged', () => {
  beforeEach(() => {
    (onChildChanged as jest.Mock)
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        callback({
          val: (): Partial<Item> => ({
            text: itemText + 2,
            updatedAt: dateNow + 2,
            updatedBy: userId + 2,
          }),
          key: itemId,
        });
        return unsubscribeOnChildChanged;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithContext(<TestComponent />);
    expect(getItemsRef).toBeCalledTimes(1);
    expect(getItemsRef).toBeCalledWith(boardId);
    expect(onChildChanged).toBeCalledTimes(1);
    expect(onChildChanged).toBeCalledWith(itemsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildChanged).toBeCalledTimes(1);
  });

  it('updates item in store', () => {
    updateStore.withItem();
    renderWithContext(<TestComponent />);
    jest.runAllTimers();
    expect(getStoreState().items).toMatchInlineSnapshot(`
      Object {
        "item_test_id": Object {
          "createdAt": 1234567890,
          "createdBy": "user_test_id",
          "text": "Item text2",
          "updatedAt": 1234567892,
          "updatedBy": "user_test_id2",
        },
      }
    `);
  });

  it('does not update item when itemId is invalid', () => {
    (onChildChanged as jest.Mock)
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        callback({
          val: () => null,
          key: null,
        });
        return unsubscribeOnChildChanged;
      });
    renderWithContext(<TestComponent />);
    jest.runAllTimers();
    expect(getStoreState().items).toEqual({});
  });
});

describe('onChildRemoved', () => {
  beforeEach(() => {
    (onChildRemoved as jest.Mock)
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        callback({
          key: itemId,
        });
        return unsubscribeOnChildRemoved;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithContext(<TestComponent />);
    expect(getItemsRef).toBeCalledTimes(1);
    expect(getItemsRef).toBeCalledWith(boardId);
    expect(onChildRemoved).toBeCalledTimes(1);
    expect(onChildRemoved).toBeCalledWith(itemsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildRemoved).toBeCalledTimes(1);
  });

  it('removes item from store', () => {
    updateStore.withItem();
    renderWithContext(<TestComponent />);
    jest.runAllTimers();
    expect(getStoreState().items).toEqual({});
  });
});
