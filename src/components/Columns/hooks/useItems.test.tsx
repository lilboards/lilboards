import {
  getStoreState,
  renderWithStore,
  updateStore,
} from '../../../utils/test';
import { getItemsRef } from '../../../firebase';
import {
  BOARD_TEST_ID as boardId,
  DATE_NOW as dateNow,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../../../constants/test';
import { useItems } from './useItems';

import { EventType, Item } from '../../../types';

jest.mock('../../../firebase', () => ({
  getItemsRef: jest.fn(),
}));

function TestComponent() {
  useItems(boardId);
  return null;
}

const itemText = 'Item text';

const itemsRefOn = jest.fn();
const itemsRefOff = jest.fn();

beforeEach(() => {
  itemsRefOn.mockClear();
  itemsRefOff.mockClear();
  (getItemsRef as jest.Mock).mockReturnValueOnce({
    on: itemsRefOn,
    off: itemsRefOff,
  });
});

describe('mount', () => {
  it.each([
    EventType.child_added,
    EventType.child_changed,
    EventType.child_removed,
  ])('listens to itemsRef %j', (eventType) => {
    renderWithStore(<TestComponent />);
    expect(itemsRefOn).toBeCalledWith(eventType, expect.any(Function));
  });
});

describe('unmount', () => {
  it.each([
    EventType.child_added,
    EventType.child_changed,
    EventType.child_removed,
  ])('unlistens to itemsRef %j', (eventType) => {
    const { unmount } = renderWithStore(<TestComponent />);
    unmount();
    expect(itemsRefOff).toBeCalledWith(eventType);
  });
});

describe(`${EventType.child_added}`, () => {
  beforeEach(() => {
    (getItemsRef as jest.Mock).mockReturnValueOnce({
      on: itemsRefOn.mockImplementation((eventType, callback) => {
        if (eventType === EventType.child_added) {
          callback({
            val: (): Item => ({
              createdAt: dateNow,
              createdBy: userId,
              text: itemText,
            }),
            key: itemId,
          });
        }
      }),
    });
  });

  it('adds item to store', (done) => {
    renderWithStore(<TestComponent />);
    setTimeout(() => {
      expect(getStoreState().items).toMatchInlineSnapshot(`
        Object {
          "item_test_id": Object {
            "createdAt": 1234567890,
            "createdBy": "user_test_id",
            "text": "Item text",
          },
        }
      `);
      done();
    });
  });
});

describe(`${EventType.child_changed}`, () => {
  beforeEach(() => {
    (getItemsRef as jest.Mock).mockReturnValueOnce({
      on: itemsRefOn.mockImplementation((eventType, callback) => {
        if (eventType === EventType.child_changed) {
          callback({
            val: (): Partial<Item> => ({
              text: itemText + 2,
              updatedAt: dateNow + 2,
              updatedBy: userId + 2,
            }),
            key: itemId,
          });
        }
      }),
    });
  });

  it('updates item in store', (done) => {
    updateStore.withItem(true);
    renderWithStore(<TestComponent />);
    setTimeout(() => {
      expect(getStoreState().items).toMatchInlineSnapshot(`
        Object {
          "item_test_id": Object {
            "createdAt": 1234567890,
            "createdBy": "user_test_id",
            "likes": Object {},
            "text": "Item text2",
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
    (getItemsRef as jest.Mock).mockReturnValueOnce({
      on: itemsRefOn.mockImplementation((eventType, callback) => {
        if (eventType === EventType.child_removed) {
          callback({ key: itemId });
        }
      }),
    });
  });

  it('removes item from store', (done) => {
    updateStore.withItem();
    renderWithStore(<TestComponent />);
    setTimeout(() => {
      expect(getStoreState().items).toEqual({});
      done();
    });
  });
});
