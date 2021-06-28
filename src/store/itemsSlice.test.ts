import { BOARD_TEST_ID, ITEM_TEST_ID } from '../constants/test';
import { actions, initialState, reducer } from './itemsSlice';

const boardId = BOARD_TEST_ID;
const itemId = ITEM_TEST_ID;

describe('addItem', () => {
  it('adds item', () => {
    const payload = { boardId, itemId };
    const newState = reducer(initialState, actions.addItem(payload));
    const item = Object.values(newState)[0];
    expect(item).toEqual({
      created: expect.any(Number),
      text: '',
      updated: expect.any(Number),
    });
    expect(Object.keys(newState)[0]).toBe(itemId);
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
