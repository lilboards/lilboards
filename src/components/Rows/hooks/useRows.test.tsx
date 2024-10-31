import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from 'firebase/database';
import { getRowsRef } from 'src/firebase';
import { Row } from 'src/types';
import { dateNow, listId, rowId, userId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';

import { useRows } from './useRows';

const mockedOnChildAdded = jest.mocked(onChildAdded);
const mockedOnChildChanged = jest.mocked(onChildChanged);
const mockedOnChildRemoved = jest.mocked(onChildRemoved);

jest.mock('src/firebase', () => ({
  getRowsRef: jest.fn(),
}));

const mockedGetRowsRef = jest.mocked(getRowsRef);

function TestComponent() {
  useRows(listId);
  return null;
}

const rowsRef = 'rowsRef';
const rowName = 'Row name';

const unsubscribeOnChildAdded = jest.fn();
const unsubscribeOnChildChanged = jest.fn();
const unsubscribeOnChildRemoved = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  mockedGetRowsRef.mockReturnValueOnce(rowsRef as any);

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
        val: (): Row => ({
          createdAt: dateNow,
          createdBy: userId,
          name: rowName,
        }),
        key: rowId,
      };
      callback(dataSnapshot as any, null);
      return unsubscribeOnChildAdded;
    });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getRowsRef).toHaveBeenCalledTimes(1);
    expect(getRowsRef).toHaveBeenCalledWith(listId);
    expect(onChildAdded).toHaveBeenCalledTimes(1);
    expect(onChildAdded).toHaveBeenCalledWith(rowsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildAdded).toHaveBeenCalledTimes(1);
  });

  it('adds row to store', () => {
    renderWithProviders(<TestComponent />);
    jest.runAllTimers();
    expect(store.getState().rows).toEqual({
      row_test_id: {
        createdAt: 1234567890,
        createdBy: 'user_test_id',
        name: 'Row name',
      },
    });
  });

  it('does not add row when rowId is invalid', () => {
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
    expect(store.getState().rows).toEqual({});
  });
});

describe('onChildChanged', () => {
  beforeEach(() => {
    mockedOnChildChanged
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        const dataSnapshot = {
          val: (): Partial<Row> => ({
            name: rowName + 2,
            updatedAt: dateNow + 2,
            updatedBy: userId + 2,
          }),
          key: rowId,
        };
        callback(dataSnapshot as any, null);
        return unsubscribeOnChildChanged;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getRowsRef).toHaveBeenCalledTimes(1);
    expect(getRowsRef).toHaveBeenCalledWith(listId);
    expect(onChildChanged).toHaveBeenCalledTimes(1);
    expect(onChildChanged).toHaveBeenCalledWith(rowsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildChanged).toHaveBeenCalledTimes(1);
  });

  it('updates row in store', () => {
    updateStore.withRow();
    renderWithProviders(<TestComponent />);
    jest.runAllTimers();
    expect(store.getState().rows).toEqual({
      row_test_id: {
        createdAt: 1234567890,
        createdBy: 'user_test_id',
        name: 'Row name2',
        updatedAt: 1234567892,
        updatedBy: 'user_test_id2',
      },
    });
  });

  it('does not update row when rowId is invalid', () => {
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
    expect(store.getState().rows).toEqual({});
  });
});

describe('onChildRemoved', () => {
  beforeEach(() => {
    mockedOnChildRemoved
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        const dataSnapshot = { key: rowId };
        callback(dataSnapshot as any);
        return unsubscribeOnChildRemoved;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getRowsRef).toHaveBeenCalledTimes(1);
    expect(getRowsRef).toHaveBeenCalledWith(listId);
    expect(onChildChanged).toHaveBeenCalledTimes(1);
    expect(onChildChanged).toHaveBeenCalledWith(rowsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildChanged).toHaveBeenCalledTimes(1);
  });

  it('removes row from store', () => {
    updateStore.withRow();
    renderWithProviders(<TestComponent />);
    jest.runAllTimers();
    expect(store.getState().rows).toEqual({});
  });
});
