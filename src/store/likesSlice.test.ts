import {
  BOARD_TEST_ID as boardId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../constants/test';
import { actions, initialState, reducer } from './likesSlice';

const state = {
  items: {
    [itemId]: {
      [userId]: true,
    },
  },
};

describe('likeItem', () => {
  it('likes item', () => {
    const payload = { boardId, itemId, userId };
    const newState = reducer(initialState, actions.likeItem(payload));
    expect(newState).toMatchInlineSnapshot(`
      Object {
        "items": Object {
          "item_test_id": Object {
            "user_test_id": true,
          },
        },
      }
    `);
  });
});

describe('unlikeItem', () => {
  it('unlikes item', () => {
    const payload = { boardId, itemId, userId };
    const newState = reducer(state, actions.unlikeItem(payload));
    expect(newState).toMatchInlineSnapshot(`
      Object {
        "items": Object {
          "item_test_id": Object {},
        },
      }
    `);
  });

  it('cannot unlike item not found', () => {
    const payload = { boardId, itemId, userId };
    const newState = reducer(initialState, actions.unlikeItem(payload));
    expect(newState).toBe(initialState);
  });
});

describe('loadLikes', () => {
  it('loads likes', () => {
    const newState = reducer(initialState, actions.loadLikes(state));
    expect(newState).toBe(state);
  });
});

describe('removeLikesItem', () => {
  it('deletes item', () => {
    const payload = { boardId, itemId };
    const newState = reducer(state, actions.removeLikesItem(payload));
    expect(newState).toEqual({ items: {} });
  });
});

describe('resetLikes', () => {
  it('sets initialState', () => {
    expect(reducer(state, actions.resetLikes())).toBe(initialState);
  });
});

describe('setLikesItem', () => {
  it('overrides item likes', () => {
    const payload = {
      boardId,
      itemId,
      likes: {
        [`${userId}2`]: true,
      },
    };
    const newState = reducer(state, actions.setLikesItem(payload));
    expect(newState).toMatchInlineSnapshot(`
      Object {
        "items": Object {
          "item_test_id": Object {
            "user_test_id2": true,
          },
        },
      }
    `);
  });
});
