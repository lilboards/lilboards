import {
  BOARD_TEST_ID as boardId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../constants/test';
import { actions, initialState, reducer } from './itemsSlice';

describe('updateItem', () => {
  it('does nothing if no item in payload', () => {
    const item = {};
    const payload = {
      ...item,
      itemId,
    };
    const newState = reducer(initialState, actions.updateItem(payload));
    expect(newState).toEqual({ [itemId]: item });
  });

  it('updates item', () => {
    const item = {
      created: Date.now(),
      text: '',
      updated: Date.now(),
    };
    const payload = {
      ...item,
      itemId,
    };
    const newState = reducer(initialState, actions.updateItem(payload));
    expect(newState).toEqual({ [itemId]: item });
  });

  it('sets likes', () => {
    const item = {
      likes: {
        [userId]: true,
      },
    };
    const payload = {
      ...item,
      itemId,
    };
    const newState = reducer(initialState, actions.updateItem(payload));
    expect(newState).toEqual({ [itemId]: item });
  });
});

describe('loadItems', () => {
  it('sets items', () => {
    const item = {
      created: Date.now(),
      text: 'Item 1',
      updated: Date.now(),
    };
    const payload = { [itemId]: item };
    const newState = reducer(initialState, actions.loadItems(payload));
    expect(newState).toBe(payload);
  });
});

describe('removeItem', () => {
  it('deletes item', () => {
    const item = {
      created: Date.now(),
      text: 'Item Name',
      updated: Date.now(),
    };
    const state = { [itemId]: item };
    const payload = { boardId, itemId };
    expect(reducer(state, actions.removeItem(payload))).toEqual({});
  });
});

describe('resetItems', () => {
  it('sets initialState', () => {
    const item = {
      created: Date.now(),
      text: 'Item Name',
      updated: Date.now(),
    };
    const state = { [itemId]: item };
    expect(reducer(state, actions.resetItems())).toEqual(initialState);
  });
});
