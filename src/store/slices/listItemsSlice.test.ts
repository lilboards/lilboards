import { itemId, listId, userId } from 'test/constants';

import { initialState, listItemsSlice } from './listItemsSlice';

export const { actions, reducer } = listItemsSlice;

const item = {
  createdAt: Date.now(),
  createdBy: userId,
  text: '',
};

const state = {
  [itemId]: item,
};

describe('updateListItem', () => {
  it('does nothing if item payload is empty', () => {
    const payload = {
      listId,
      item: {},
      itemId,
    };
    const newState = reducer(state, actions.updateListItem(payload));
    expect(newState).toBe(state);
  });

  it('updates item', () => {
    const payload = {
      item,
      itemId,
      skipSave: true,
    };
    const newState = reducer(initialState, actions.updateListItem(payload));
    expect(newState).toEqual({ [itemId]: item });
  });
});

describe('removeListItem', () => {
  it('deletes item', () => {
    const payload = { listId, itemId };
    expect(reducer(state, actions.removeListItem(payload))).toEqual({});
  });

  it('deletes item from items', () => {
    const itemId2 = `${itemId}2`;
    const state = {
      [itemId]: item,
      [itemId2]: item,
    };
    const payload = { itemId: itemId2, skipSave: true };
    expect(reducer(state, actions.removeListItem(payload))).toEqual({
      [itemId]: item,
    });
  });
});

describe('resetListItems', () => {
  it('sets initialState', () => {
    expect(reducer(state, actions.resetListItems())).toBe(initialState);
  });
});
