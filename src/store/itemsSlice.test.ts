import {
  BOARD_TEST_ID as boardId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../constants/test';
import { actions, initialState, reducer } from './itemsSlice';

const item = {
  createdAt: Date.now(),
  createdBy: userId,
  text: '',
};

const state = {
  [itemId]: item,
};

describe('updateItem', () => {
  it('does nothing if item payload is empty', () => {
    const payload = {
      boardId,
      item: {},
      itemId,
    };
    const newState = reducer(state, actions.updateItem(payload));
    expect(newState).toBe(state);
  });

  it('updates item', () => {
    const payload = {
      item,
      itemId,
      skipSave: true,
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

describe('removeItem', () => {
  it('deletes item', () => {
    const payload = { boardId, itemId };
    expect(reducer(state, actions.removeItem(payload))).toEqual({});
  });

  it('deletes item from items', () => {
    const itemId2 = `${itemId}2`;
    const state = {
      [itemId]: item,
      [itemId2]: item,
    };
    const payload = { itemId: itemId2, skipSave: true };
    expect(reducer(state, actions.removeItem(payload))).toEqual({
      [itemId]: item,
    });
  });
});

describe('resetItems', () => {
  it('sets initialState', () => {
    expect(reducer(state, actions.resetItems())).toBe(initialState);
  });
});
