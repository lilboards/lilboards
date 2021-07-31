import {
  getStoreState,
  renderWithStore,
  updateStore,
} from '../../../utils/test';
import { getColumnsRef } from '../../../firebase';
import {
  BOARD_TEST_ID as boardId,
  DATE_NOW as dateNow,
  COLUMN_TEST_ID as columnId,
  USER_TEST_ID as userId,
} from '../../../constants/test';
import { useColumns } from './useColumns';

import { EventType, Column } from '../../../types';

jest.mock('../../../firebase', () => ({
  getColumnsRef: jest.fn(),
}));

function TestComponent() {
  useColumns(boardId);
  return null;
}

const columnName = 'Column name';

const columnsRefOn = jest.fn();
const columnsRefOff = jest.fn();

beforeEach(() => {
  columnsRefOn.mockClear();
  columnsRefOff.mockClear();
  (getColumnsRef as jest.Mock).mockReturnValueOnce({
    on: columnsRefOn,
    off: columnsRefOff,
  });
});

describe('mount', () => {
  it.each([
    EventType.child_added,
    EventType.child_changed,
    EventType.child_removed,
  ])('listens to columnsRef %j', (eventType) => {
    renderWithStore(<TestComponent />);
    expect(columnsRefOn).toBeCalledWith(eventType, expect.any(Function));
  });
});

describe('unmount', () => {
  it.each([
    EventType.child_added,
    EventType.child_changed,
    EventType.child_removed,
  ])('unlistens to columnsRef %j', (eventType) => {
    const { unmount } = renderWithStore(<TestComponent />);
    unmount();
    expect(columnsRefOff).toBeCalledWith(eventType);
  });
});

describe(`${EventType.child_added}`, () => {
  beforeEach(() => {
    (getColumnsRef as jest.Mock).mockReturnValueOnce({
      on: columnsRefOn.mockImplementation((eventType, callback) => {
        if (eventType === EventType.child_added) {
          callback({
            val: (): Column => ({
              createdAt: dateNow,
              createdBy: userId,
              name: columnName,
            }),
            key: columnId,
          });
        }
      }),
    });
  });

  it('adds column to store', (done) => {
    renderWithStore(<TestComponent />);
    setTimeout(() => {
      expect(getStoreState().columns).toMatchInlineSnapshot(`
        Object {
          "column_test_id": Object {
            "createdAt": 1234567890,
            "createdBy": "user_test_id",
            "name": "Column name",
          },
        }
      `);
      done();
    });
  });
});

describe(`${EventType.child_changed}`, () => {
  beforeEach(() => {
    (getColumnsRef as jest.Mock).mockReturnValueOnce({
      on: columnsRefOn.mockImplementation((eventType, callback) => {
        if (eventType === EventType.child_changed) {
          callback({
            val: (): Partial<Column> => ({
              name: columnName + 2,
              updatedAt: dateNow + 2,
              updatedBy: userId + 2,
            }),
            key: columnId,
          });
        }
      }),
    });
  });

  it('updates column in store', (done) => {
    updateStore.withColumn();
    renderWithStore(<TestComponent />);
    setTimeout(() => {
      expect(getStoreState().columns).toMatchInlineSnapshot(`
        Object {
          "column_test_id": Object {
            "createdAt": 1234567890,
            "createdBy": "user_test_id",
            "itemIds": Array [
              "item_test_id",
            ],
            "name": "Column name2",
            "updatedAt": 1234567892,
            "updatedBy": "user_test_id2",
          },
        }
      `);
      done();
    });
  });
});

describe(`${EventType.child_removed}`, () => {
  beforeEach(() => {
    (getColumnsRef as jest.Mock).mockReturnValueOnce({
      on: columnsRefOn.mockImplementation((eventType, callback) => {
        if (eventType === EventType.child_removed) {
          callback({ key: columnId });
        }
      }),
    });
  });

  it('removes column from store', (done) => {
    updateStore.withColumn();
    renderWithStore(<TestComponent />);
    setTimeout(() => {
      expect(getStoreState().columns).toEqual({});
      done();
    });
  });
});
