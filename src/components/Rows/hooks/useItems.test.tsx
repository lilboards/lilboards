import type { DatabaseReference, DataSnapshot } from 'firebase/database';
import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from 'firebase/database';
import { getListItemsRef } from 'src/firebase';
import { ListItem } from 'src/types';
import { dateNow, itemId, listId, userId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useItems } from './useItems';

const mockedOnChildAdded = vi.mocked(onChildAdded);
const mockedOnChildChanged = vi.mocked(onChildChanged);
const mockedOnChildRemoved = vi.mocked(onChildRemoved);

vi.mock('src/firebase');

const mockedGetItemsRef = vi.mocked(getListItemsRef);

function TestComponent() {
  useItems(listId);
  return null;
}

const itemText = 'Item text';
const itemsRef = 'itemsRef';

const unsubscribeOnChildAdded = vi.fn();
const unsubscribeOnChildChanged = vi.fn();
const unsubscribeOnChildRemoved = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  mockedGetItemsRef.mockReturnValueOnce(
    itemsRef as unknown as DatabaseReference,
  );
  mockedOnChildAdded.mockImplementationOnce((query, callback) => {
    const dataSnapshot = { val: () => null };
    callback(dataSnapshot as unknown as DataSnapshot, null);
    return unsubscribeOnChildAdded;
  });
  mockedOnChildChanged.mockImplementationOnce((query, callback) => {
    const dataSnapshot = { val: () => null };
    callback(dataSnapshot as unknown as DataSnapshot, null);
    return unsubscribeOnChildChanged;
  });
  mockedOnChildRemoved.mockImplementationOnce((query, callback) => {
    const dataSnapshot = {};
    callback(dataSnapshot as unknown as DataSnapshot);
    return unsubscribeOnChildRemoved;
  });
  [
    unsubscribeOnChildAdded,
    unsubscribeOnChildChanged,
    unsubscribeOnChildRemoved,
  ].forEach((mock) => mock.mockClear());
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe('onChildAdded', () => {
  beforeEach(() => {
    mockedOnChildAdded.mockReset().mockImplementationOnce((query, callback) => {
      const dataSnapshot = {
        val: (): ListItem => ({
          createdAt: dateNow,
          createdBy: userId,
          text: itemText,
        }),
        key: itemId,
      };
      callback(dataSnapshot as unknown as DataSnapshot, null);
      return unsubscribeOnChildAdded;
    });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getListItemsRef).toHaveBeenCalledTimes(1);
    expect(getListItemsRef).toHaveBeenCalledWith(listId);
    expect(onChildAdded).toHaveBeenCalledTimes(1);
    expect(onChildAdded).toHaveBeenCalledWith(itemsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildAdded).toHaveBeenCalledTimes(1);
  });

  it('adds item to store', () => {
    renderWithProviders(<TestComponent />);
    vi.runAllTimers();
    expect(store.getState().listItems).toEqual({
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
      callback(dataSnapshot as unknown as DataSnapshot, null);
      return unsubscribeOnChildAdded;
    });
    renderWithProviders(<TestComponent />);
    vi.runAllTimers();
    expect(store.getState().listItems).toEqual({});
  });
});

describe('onChildChanged', () => {
  beforeEach(() => {
    mockedOnChildChanged
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        const dataSnapshot = {
          val: (): Partial<ListItem> => ({
            text: itemText + String(2),
            updatedAt: dateNow + 2,
            updatedBy: userId + String(2),
          }),
          key: itemId,
        };
        callback(dataSnapshot as unknown as DataSnapshot, null);
        return unsubscribeOnChildChanged;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getListItemsRef).toHaveBeenCalledTimes(1);
    expect(getListItemsRef).toHaveBeenCalledWith(listId);
    expect(onChildChanged).toHaveBeenCalledTimes(1);
    expect(onChildChanged).toHaveBeenCalledWith(itemsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildChanged).toHaveBeenCalledTimes(1);
  });

  it('updates item in store', () => {
    updateStore.withListItem();
    renderWithProviders(<TestComponent />);
    vi.runAllTimers();
    expect(store.getState().listItems).toEqual({
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
        callback(dataSnapshot as unknown as DataSnapshot, null);
        return unsubscribeOnChildChanged;
      });
    renderWithProviders(<TestComponent />);
    vi.runAllTimers();
    expect(store.getState().listItems).toEqual({});
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
        callback(dataSnapshot as unknown as DataSnapshot);
        return unsubscribeOnChildRemoved;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getListItemsRef).toHaveBeenCalledTimes(1);
    expect(getListItemsRef).toHaveBeenCalledWith(listId);
    expect(onChildRemoved).toHaveBeenCalledTimes(1);
    expect(onChildRemoved).toHaveBeenCalledWith(itemsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildRemoved).toHaveBeenCalledTimes(1);
  });

  it('removes item from store', () => {
    updateStore.withListItem();
    renderWithProviders(<TestComponent />);
    vi.runAllTimers();
    expect(store.getState().listItems).toEqual({});
  });
});
