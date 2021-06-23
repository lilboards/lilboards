import { BOARD_TEST_ID, ITEM_TEST_ID } from '../constants/test';
import { actions, initialState, reducer } from './itemsSlice';

const boardId = BOARD_TEST_ID;
const itemId = ITEM_TEST_ID;

describe('addItem', () => {
  it('adds item', () => {
    const newState = reducer(initialState, actions.addItem(boardId));
    const item = Object.values(newState)[0];
    expect(item).toEqual({
      created: expect.any(Number),
      text: '',
      updated: expect.any(Number),
    });
    const id = Object.keys(newState)[0];
    expect({ id }).toMatchObject({ id: expect.any(String) });
  });
});

describe('resetItems', () => {
  it('sets initialState', () => {
    const state = {
      [itemId]: {
        created: 0,
        text: 'Item Name',
        updated: 0,
      },
    };
    expect(reducer(state, actions.resetItems())).toEqual(initialState);
  });
});
