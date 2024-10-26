import {
  BOARD_TEST_ID as boardId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from 'test/constants';

import { initialState, itemsSlice } from './itemsSlice';

export const { actions, reducer } = itemsSlice;

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
