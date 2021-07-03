import {
  BOARD_TEST_ID as boardId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../constants/test';
import { actions, initialState, reducer } from './itemsSlice';

const item = {
  created: Date.now(),
  text: '',
  updated: Date.now(),
};

const state = {
  [itemId]: item,
};

describe('updateItem', () => {
  it('does nothing if item payload is empty', () => {
    const payload = { itemId, item: {} };
    const newState = reducer(state, actions.updateItem(payload));
    expect(newState).toBe(state);
  });

  it('updates item', () => {
    const payload = {
      item,
      itemId,
    };
    const newState = reducer(initialState, actions.updateItem(payload));
    expect(newState).toEqual({ [itemId]: item });
  });
});

describe('likeItem', () => {
  it('does nothing if userId is empty', () => {
    const payload = { itemId, userId: '' };
    const newState = reducer(state, actions.likeItem(payload));
    expect(newState).toBe(state);
  });

  it('does nothing if item does not exist', () => {
    const payload = { itemId, userId };
    const newState = reducer(initialState, actions.likeItem(payload));
    expect(newState).toBe(initialState);
  });

  it('likes item', () => {
    const payload = { itemId, userId };
    const newState = reducer(state, actions.likeItem(payload));
    expect(newState[itemId].likes).toEqual({ [userId]: true });
  });
});

describe('unlikeItem', () => {
  it('does nothing if userId is empty', () => {
    const payload = { itemId, userId: '' };
    const newState = reducer(state, actions.unlikeItem(payload));
    expect(newState).toBe(state);
  });

  it('does nothing if item does not exist', () => {
    const payload = { itemId, userId };
    const newState = reducer(initialState, actions.unlikeItem(payload));
    expect(newState).toBe(initialState);
  });

  it('unlikes item', () => {
    const state = {
      [itemId]: {
        ...item,
        likes: { [userId]: true },
      },
    };
    const payload = { itemId, userId };
    const newState = reducer(state, actions.unlikeItem(payload));
    expect(newState[itemId].likes).toEqual({});
  });
});

describe('loadItems', () => {
  it('sets items', () => {
    const payload = { [itemId]: item };
    const newState = reducer(initialState, actions.loadItems(payload));
    expect(newState).toBe(payload);
  });
});

describe('removeItem', () => {
  it('deletes item', () => {
    const payload = { boardId, itemId };
    expect(reducer(state, actions.removeItem(payload))).toEqual({});
  });
});

describe('resetItems', () => {
  it('sets initialState', () => {
    expect(reducer(state, actions.resetItems())).toBe(initialState);
  });
});
