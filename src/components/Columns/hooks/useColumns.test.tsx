import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from 'firebase/database';

import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
  DATE_NOW as dateNow,
  USER_TEST_ID as userId,
} from '../../../constants/test';
import { getColumnsRef } from '../../../firebase';
import { Column } from '../../../types';
import { renderWithProviders, store, updateStore } from '../../../utils/test';
import { useColumns } from './useColumns';

const mockedOnChildAdded = jest.mocked(onChildAdded);
const mockedOnChildChanged = jest.mocked(onChildChanged);
const mockedOnChildRemoved = jest.mocked(onChildRemoved);

jest.mock('../../../firebase', () => ({
  getColumnsRef: jest.fn(),
}));

const mockedGetColumnsRef = jest.mocked(getColumnsRef);

function TestComponent() {
  useColumns(boardId);
  return null;
}

const columnsRef = 'columnsRef';
const columnName = 'Column name';

const unsubscribeOnChildAdded = jest.fn();
const unsubscribeOnChildChanged = jest.fn();
const unsubscribeOnChildRemoved = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  mockedGetColumnsRef.mockReturnValueOnce(columnsRef as any);

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
      callback(dataSnapshot as any, null);
      return unsubscribeOnChildAdded;
    });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getColumnsRef).toBeCalledTimes(1);
    expect(getColumnsRef).toBeCalledWith(boardId);
    expect(onChildAdded).toBeCalledTimes(1);
    expect(onChildAdded).toBeCalledWith(columnsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildAdded).toBeCalledTimes(1);
  });

  it('adds column to store', () => {
    renderWithProviders(<TestComponent />);
    jest.runAllTimers();
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
      callback(dataSnapshot as any, null);
      return unsubscribeOnChildAdded;
    });
    renderWithProviders(<TestComponent />);
    jest.runAllTimers();
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
            name: columnName + 2,
            updatedAt: dateNow + 2,
            updatedBy: userId + 2,
          }),
          key: columnId,
        };
        callback(dataSnapshot as any, null);
        return unsubscribeOnChildChanged;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getColumnsRef).toBeCalledTimes(1);
    expect(getColumnsRef).toBeCalledWith(boardId);
    expect(onChildChanged).toBeCalledTimes(1);
    expect(onChildChanged).toBeCalledWith(columnsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildChanged).toBeCalledTimes(1);
  });

  it('updates column in store', () => {
    updateStore.withColumn();
    renderWithProviders(<TestComponent />);
    jest.runAllTimers();
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
        callback(dataSnapshot as any, null);
        return unsubscribeOnChildChanged;
      });
    renderWithProviders(<TestComponent />);
    jest.runAllTimers();
    expect(store.getState().columns).toEqual({});
  });
});

describe('onChildRemoved', () => {
  beforeEach(() => {
    mockedOnChildRemoved
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        const dataSnapshot = { key: columnId };
        callback(dataSnapshot as any);
        return unsubscribeOnChildRemoved;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    expect(getColumnsRef).toBeCalledTimes(1);
    expect(getColumnsRef).toBeCalledWith(boardId);
    expect(onChildChanged).toBeCalledTimes(1);
    expect(onChildChanged).toBeCalledWith(columnsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildChanged).toBeCalledTimes(1);
  });

  it('removes column from store', () => {
    updateStore.withColumn();
    renderWithProviders(<TestComponent />);
    jest.runAllTimers();
    expect(store.getState().columns).toEqual({});
  });
});
