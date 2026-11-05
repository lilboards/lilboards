import type { DatabaseReference, DataSnapshot } from 'firebase/database';
import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from 'firebase/database';
import { getColumnsRef } from 'src/firebase';
import { Column } from 'src/types';
import { boardId, columnId, dateNow, userId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useColumns } from './useColumns';

const mockedOnChildAdded = vi.mocked(onChildAdded);
const mockedOnChildChanged = vi.mocked(onChildChanged);
const mockedOnChildRemoved = vi.mocked(onChildRemoved);

vi.mock('src/firebase');

const mockedGetColumnsRef = vi.mocked(getColumnsRef);

function TestComponent() {
  useColumns(boardId);
  return null;
}

const columnsRef = 'columnsRef';
const columnName = 'Column name';

const unsubscribeOnChildAdded = vi.fn();
const unsubscribeOnChildChanged = vi.fn();
const unsubscribeOnChildRemoved = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  mockedGetColumnsRef.mockReturnValueOnce(
    columnsRef as unknown as DatabaseReference,
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
        val: (): Column => ({
          createdAt: dateNow,
          createdBy: userId,
          name: columnName,
        }),
        key: columnId,
      };
      callback(dataSnapshot as unknown as DataSnapshot, null);
      return unsubscribeOnChildAdded;
    });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getColumnsRef).toHaveBeenCalledTimes(1);
    expect(getColumnsRef).toHaveBeenCalledWith(boardId);
    expect(onChildAdded).toHaveBeenCalledTimes(1);
    expect(onChildAdded).toHaveBeenCalledWith(columnsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildAdded).toHaveBeenCalledTimes(1);
  });

  it('adds column to store', () => {
    renderWithProviders(<TestComponent />);
    vi.runAllTimers();
    expect(store.getState().columns).toEqual({
      column_test_id: {
        createdAt: 1234567890,
        createdBy: 'user_test_id',
        name: 'Column name',
      },
    });
  });

  it('does not add column when columnId is invalid', () => {
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
    expect(store.getState().columns).toEqual({});
  });
});

describe('onChildChanged', () => {
  beforeEach(() => {
    mockedOnChildChanged
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        const dataSnapshot = {
          val: (): Partial<Column> => ({
            name: columnName + String(2),
            updatedAt: dateNow + 2,
            updatedBy: userId + String(2),
          }),
          key: columnId,
        };
        callback(dataSnapshot as unknown as DataSnapshot, null);
        return unsubscribeOnChildChanged;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getColumnsRef).toHaveBeenCalledTimes(1);
    expect(getColumnsRef).toHaveBeenCalledWith(boardId);
    expect(onChildChanged).toHaveBeenCalledTimes(1);
    expect(onChildChanged).toHaveBeenCalledWith(
      columnsRef,
      expect.any(Function),
    );
    unmount();
    expect(unsubscribeOnChildChanged).toHaveBeenCalledTimes(1);
  });

  it('updates column in store', () => {
    updateStore.withColumn();
    renderWithProviders(<TestComponent />);
    vi.runAllTimers();
    expect(store.getState().columns).toEqual({
      column_test_id: {
        createdAt: 1234567890,
        createdBy: 'user_test_id',
        name: 'Column name2',
        updatedAt: 1234567892,
        updatedBy: 'user_test_id2',
      },
    });
  });

  it('does not update column when columnId is invalid', () => {
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
    expect(store.getState().columns).toEqual({});
  });
});

describe('onChildRemoved', () => {
  beforeEach(() => {
    mockedOnChildRemoved
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        const dataSnapshot = { key: columnId };
        callback(dataSnapshot as unknown as DataSnapshot);
        return unsubscribeOnChildRemoved;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getColumnsRef).toHaveBeenCalledTimes(1);
    expect(getColumnsRef).toHaveBeenCalledWith(boardId);
    expect(onChildChanged).toHaveBeenCalledTimes(1);
    expect(onChildChanged).toHaveBeenCalledWith(
      columnsRef,
      expect.any(Function),
    );
    unmount();
    expect(unsubscribeOnChildChanged).toHaveBeenCalledTimes(1);
  });

  it('removes column from store', () => {
    updateStore.withColumn();
    renderWithProviders(<TestComponent />);
    vi.runAllTimers();
    expect(store.getState().columns).toEqual({});
  });
});
