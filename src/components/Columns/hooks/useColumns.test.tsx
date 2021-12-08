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
import { renderWithContext, store, updateStore } from '../../../utils/test';
import { useColumns } from './useColumns';

jest.mock('firebase/database', () => ({
  onChildAdded: jest.fn(),
  onChildChanged: jest.fn(),
  onChildRemoved: jest.fn(),
}));

jest.mock('../../../firebase', () => ({
  getColumnsRef: jest.fn(),
}));

function TestComponent() {
  useColumns(boardId);
  return null;
}

const columnsRef = 'columnsRef';
const columnName = 'Column name';

const unsubscribeOnChildAdded = jest.fn();
const unsubscribeOnChildChanged = jest.fn();
const unsubscribeOnChildRemoved = jest.fn();

afterAll(() => {
  jest.useRealTimers();
});

beforeEach(() => {
  jest.useFakeTimers();
  (getColumnsRef as jest.Mock).mockReturnValueOnce(columnsRef);
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
          val: (): Column => ({
            createdAt: dateNow,
            createdBy: userId,
            name: columnName,
          }),
          key: columnId,
        });
        return unsubscribeOnChildAdded;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithContext(<TestComponent />);
    expect(getColumnsRef).toBeCalledTimes(1);
    expect(getColumnsRef).toBeCalledWith(boardId);
    expect(onChildAdded).toBeCalledTimes(1);
    expect(onChildAdded).toBeCalledWith(columnsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildAdded).toBeCalledTimes(1);
  });

  it('adds column to store', () => {
    renderWithContext(<TestComponent />);
    jest.runAllTimers();
    expect(store.getState().columns).toMatchInlineSnapshot(`
      Object {
        "column_test_id": Object {
          "createdAt": 1234567890,
          "createdBy": "user_test_id",
          "name": "Column name",
        },
      }
    `);
  });

  it('does not add column when columnId is invalid', () => {
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
    expect(store.getState().columns).toEqual({});
  });
});

describe('onChildChanged', () => {
  beforeEach(() => {
    (onChildChanged as jest.Mock)
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        callback({
          val: (): Partial<Column> => ({
            name: columnName + 2,
            updatedAt: dateNow + 2,
            updatedBy: userId + 2,
          }),
          key: columnId,
        });
        return unsubscribeOnChildChanged;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithContext(<TestComponent />);
    expect(getColumnsRef).toBeCalledTimes(1);
    expect(getColumnsRef).toBeCalledWith(boardId);
    expect(onChildChanged).toBeCalledTimes(1);
    expect(onChildChanged).toBeCalledWith(columnsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildChanged).toBeCalledTimes(1);
  });

  it('updates column in store', () => {
    updateStore.withColumn();
    renderWithContext(<TestComponent />);
    jest.runAllTimers();
    expect(store.getState().columns).toMatchInlineSnapshot(`
      Object {
        "column_test_id": Object {
          "createdAt": 1234567890,
          "createdBy": "user_test_id",
          "name": "Column name2",
          "updatedAt": 1234567892,
          "updatedBy": "user_test_id2",
        },
      }
    `);
  });

  it('does not update column when columnId is invalid', () => {
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
    expect(store.getState().columns).toEqual({});
  });
});

describe('onChildRemoved', () => {
  beforeEach(() => {
    (onChildRemoved as jest.Mock)
      .mockReset()
      .mockImplementationOnce((query, callback) => {
        callback({
          key: columnId,
        });
        return unsubscribeOnChildRemoved;
      });
  });

  it('subscribes and unsubscribes to listener', () => {
    const { unmount } = renderWithContext(<TestComponent />);
    expect(getColumnsRef).toBeCalledTimes(1);
    expect(getColumnsRef).toBeCalledWith(boardId);
    expect(onChildChanged).toBeCalledTimes(1);
    expect(onChildChanged).toBeCalledWith(columnsRef, expect.any(Function));
    unmount();
    expect(unsubscribeOnChildChanged).toBeCalledTimes(1);
  });

  it('removes column from store', () => {
    updateStore.withColumn();
    renderWithContext(<TestComponent />);
    jest.runAllTimers();
    expect(store.getState().columns).toEqual({});
  });
});
