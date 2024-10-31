import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from 'firebase/database';
import { getItemsRef } from 'src/firebase';
import { Item } from 'src/types';
import { boardId, dateNow, itemId, userId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';

import { useItems } from './useItems';

const mockedOnChildAdded = jest.mocked(onChildAdded);
const mockedOnChildChanged = jest.mocked(onChildChanged);
const mockedOnChildRemoved = jest.mocked(onChildRemoved);

jest.mock('src/firebase', () => ({
  getItemsRef: jest.fn(),
}));

const mockedGetItemsRef = jest.mocked(getItemsRef);

function TestComponent() {
  useItems(boardId);
  return null;
}

const itemText = 'Item text';
const itemsRef = 'itemsRef';

const unsubscribeOnChildAdded = jest.fn();
const unsubscribeOnChildChanged = jest.fn();
const unsubscribeOnChildRemoved = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  mockedGetItemsRef.mockReturnValueOnce(itemsRef as any);
  mockedOnChildAdded.mockImplementationOnce((query, callback) => {
    const dataSnapshot = { val: () => null };
    callback(dataSnapshot as any, null);
    return unsubscribeOnChildAdded;
  });
  mockedOnChildChanged.mockImplementationOnce((query, callback) => {
    const dataSnapshot = { val: () => null };
    callback(dataSnapshot as any, null);
    return unsubscribeOnChildChanged;
  });
  mockedOnChildRemoved.mockImplementationOnce((query, callback) => {
    const dataSnapshot = {};
    callback(dataSnapshot as any);
    return unsubscribeOnChildRemoved;
  });
  [
    unsubscribeOnChildAdded,
    unsubscribeOnChildChanged,
    unsubscribeOnChildRemoved,
  ].forEach((mock) => mock.mockClear());
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
});

describe('onChildAdded', () => {
  beforeEach(() => {
    mockedOnChildAdded.mockReset().mockImplementationOnce((query, callback) => {
      const dataSnapshot = {
        val: (): Item => ({
          createdAt: dateNow,
          createdBy: userId,
          text: itemText,
        }),
        key: itemId,
      };
      callback(dataSnapshot as any, null);
      return unsubscribeOnChildAdded;
    });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getItemsRef).toHaveBeenCalledTimes(1);
    expect(getItemsRef).toHaveBeenCalledWith(boardId);
    expect(onChildAdded).toHaveBeenCalledTimes(1);
    expect(onChildAdded).toHaveBeenCalledWith(itemsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildAdded).toHaveBeenCalledTimes(1);
  });

  it('adds item to store', () => {
    renderWithProviders(<TestComponent />);
    jest.runAllTimers();
    expect(store.getState().items).toEqual({
      [itemId]: {
        createdAt: 1234567890,
        createdBy: 'user_test_id',
        text: 'Item text',
      },
    });
  });

  it('does not add item when itemId is invalid', () => {
    mockedOnChildAdded.mockReset().mockImplementationOnce((query, callback) => {
      const dataSnapshot = {
        val: () => null,
        key: null,
      };
      callback(dataSnapshot as any, null);
      return unsubscribeOnChildAdded;
    });
    renderWithProviders(<TestComponent />);
    jest.runAllTimers();
    expect(store.getState().items).toEqual({});
  });
});

describe('onChildChanged', () => {
  beforeEach(() => {
    mockedOnChildChanged
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        const dataSnapshot = {
          val: (): Partial<Item> => ({
            text: itemText + 2,
            updatedAt: dateNow + 2,
            updatedBy: userId + 2,
          }),
          key: itemId,
        };
        callback(dataSnapshot as any, null);
        return unsubscribeOnChildChanged;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getItemsRef).toHaveBeenCalledTimes(1);
    expect(getItemsRef).toHaveBeenCalledWith(boardId);
    expect(onChildChanged).toHaveBeenCalledTimes(1);
    expect(onChildChanged).toHaveBeenCalledWith(itemsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildChanged).toHaveBeenCalledTimes(1);
  });

  it('updates item in store', () => {
    updateStore.withItem();
    renderWithProviders(<TestComponent />);
    jest.runAllTimers();
    expect(store.getState().items).toEqual({
      [itemId]: {
        createdAt: 1234567890,
        createdBy: 'user_test_id',
        text: 'Item text2',
        updatedAt: 1234567892,
        updatedBy: 'user_test_id2',
      },
    });
  });

  it('does not update item when itemId is invalid', () => {
    mockedOnChildChanged
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        const dataSnapshot = {
          val: () => null,
          key: null,
        };
        callback(dataSnapshot as any, null);
        return unsubscribeOnChildChanged;
      });
    renderWithProviders(<TestComponent />);
    jest.runAllTimers();
    expect(store.getState().items).toEqual({});
  });
});

describe('onChildRemoved', () => {
  beforeEach(() => {
    mockedOnChildRemoved
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        const dataSnapshot = {
          key: itemId,
        };
        callback(dataSnapshot as any);
        return unsubscribeOnChildRemoved;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getItemsRef).toHaveBeenCalledTimes(1);
    expect(getItemsRef).toHaveBeenCalledWith(boardId);
    expect(onChildRemoved).toHaveBeenCalledTimes(1);
    expect(onChildRemoved).toHaveBeenCalledWith(itemsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildRemoved).toHaveBeenCalledTimes(1);
  });

  it('removes item from store', () => {
    updateStore.withItem();
    renderWithProviders(<TestComponent />);
    jest.runAllTimers();
    expect(store.getState().items).toEqual({});
  });
});
