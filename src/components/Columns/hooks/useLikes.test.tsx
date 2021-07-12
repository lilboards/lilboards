import {
  getStoreState,
  renderWithStore,
  updateStore,
} from '../../../utils/test';
import { getLikesRef } from '../../../firebase';
import {
  BOARD_TEST_ID as boardId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../../../constants/test';
import { useLikes } from './useLikes';

import { EventType, Likes } from '../../../types';

jest.mock('../../../firebase', () => ({
  getLikesRef: jest.fn(),
}));

function TestComponent() {
  useLikes(boardId);
  return null;
}

const likesRefOn = jest.fn();
const likesRefOff = jest.fn();

beforeEach(() => {
  likesRefOn.mockClear();
  likesRefOff.mockClear();
  (getLikesRef as jest.Mock).mockReturnValueOnce({
    on: likesRefOn,
    off: likesRefOff,
  });
});

describe('likes snapshot value is valid', () => {
  beforeEach(() => {
    (getLikesRef as jest.Mock).mockReturnValueOnce({
      on: likesRefOn.mockImplementation((eventType, callback) => {
        if (eventType === EventType.value) {
          callback({
            val: (): Likes => ({
              items: {
                [itemId]: {
                  [userId]: true,
                },
              },
            }),
          });
        }
      }),
    });
  });

  it('adds like to store', (done) => {
    updateStore.withUser();
    renderWithStore(<TestComponent />);
    setTimeout(() => {
      expect(getStoreState().likes).toMatchInlineSnapshot(`
        Object {
          "items": Object {
            "item_test_id": Object {
              "user_test_id": true,
            },
          },
        }
      `);
      done();
    });
  });
});

describe('likes snapshot value is null', () => {
  beforeEach(() => {
    (getLikesRef as jest.Mock).mockReturnValueOnce({
      on: likesRefOn.mockImplementation((eventType, callback) => {
        if (eventType === EventType.value) {
          callback({
            val: () => null,
          });
        }
      }),
    });
  });

  it('resets likes in store', (done) => {
    updateStore.withUser();
    renderWithStore(<TestComponent />);
    setTimeout(() => {
      expect(getStoreState().likes).toMatchInlineSnapshot(`
        Object {
          "items": Object {},
        }
      `);
      done();
    });
  });
});
