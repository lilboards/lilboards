import { DatabaseKey } from 'src/constants';
import { itemId, listId, rowId, userId } from 'test/constants';

import { initialState, rowsSlice } from './rowsSlice';

const { actions, reducer } = rowsSlice;

const row = {
  createdAt: Date.now(),
  createdBy: userId,
  name: '',
};

describe('updateRow', () => {
  it('does nothing if row payload is empty', () => {
    const state = {
      [rowId]: row,
    };
    const payload = {
      listId,
      row: {},
      rowId,
    };
    const newState = reducer(state, actions.updateRow(payload));
    expect(newState).toBe(state);
  });

  it('adds row', () => {
    const payload = {
      listId,
      row,
      rowId,
    };
    const newState = reducer(initialState, actions.updateRow(payload));
    expect(newState).toEqual({
      [rowId]: row,
    });
  });

  it.each([true, false])('updates row with debounce=%p', (debounce) => {
    const state = {
      [rowId]: row,
    };
    const payload = {
      listId,
      row: {
        name: 'Edited Row',
        updatedAt: Date.now() + 1000,
      },
      rowId,
      debounce,
    };
    const newState = reducer(state, actions.updateRow(payload));
    expect(newState).toEqual({
      [rowId]: {
        ...row,
        ...payload.row,
      },
    });
  });

  it('replaces itemIds with payload itemIds', () => {
    const state = {
      [rowId]: {
        ...row,
        itemIds: ['foo', 'bar'],
      },
    };
    const payload = {
      listId,
      row: {
        itemIds: [itemId],
      },
      rowId,
      debounce: true,
      skipSave: true,
    };
    const newState = reducer(state, actions.updateRow(payload));
    expect(newState).toEqual({
      [rowId]: {
        ...row,
        ...payload.row,
      },
    });
  });

  it('deletes itemIds when itemIds is empty in payload', () => {
    const state = {
      [rowId]: {
        ...row,
        itemIds: [itemId],
      },
    };
    const payload = {
      listId,
      row: {},
      rowId,
      debounce: true,
      skipSave: true,
    };
    const newState = reducer(state, actions.updateRow(payload));
    expect(newState).toEqual({
      [rowId]: row,
    });
  });
});

describe('renameRow', () => {
  it('sets row name', () => {
    const payload = {
      listId,
      rowId,
      rowName: 'New Row',
      userId,
    };
    const newState = reducer(initialState, actions.renameRow(payload));
    expect(newState).toEqual({
      [rowId]: {
        name: payload.rowName,
        updatedAt: expect.any(Number),
        updatedBy: payload.userId,
      },
    });
  });

  it.each([true, false])('updates row name with debounce=%p', (debounce) => {
    const state = {
      [rowId]: row,
    };
    const payload = {
      listId,
      rowId,
      rowName: 'Updated Row',
      debounce,
      userId: `${userId}_2`,
    };
    expect(reducer(state, actions.renameRow(payload))).toEqual({
      [rowId]: {
        ...row,
        name: payload.rowName,
        updatedAt: expect.any(Number),
        updatedBy: payload.userId,
      },
    });
  });
});

describe('removeRow', () => {
  it('deletes row', () => {
    const state = {
      [rowId]: row,
    };
    const payload = {
      listId,
      rowId,
    };
    expect(reducer(state, actions.removeRow(payload))).toEqual({});
  });

  it('deletes row with skip save', () => {
    const state = {
      [rowId]: row,
      [`${rowId}2`]: row,
    };
    const payload = {
      listId,
      rowId,
      skipSave: true,
    };
    expect(reducer(state, actions.removeRow(payload))).toEqual({
      [`${rowId}2`]: row,
    });
  });
});

describe('addRowItemId', () => {
  it('appends item id to row', () => {
    const state = {
      [rowId]: row,
    };
    const payload = {
      listId,
      rowId,
      itemId,
    };
    const newState = reducer(state, actions.addRowItemId(payload));
    expect(newState).toEqual({
      [rowId]: {
        ...state[rowId],
        itemIds: [itemId],
      },
    });
  });

  it('appends item id to row with item ids', () => {
    const state = {
      [rowId]: {
        ...row,
        itemIds: [`${itemId}1`],
        name: 'Row 1',
      },
    };
    const payload = {
      listId,
      rowId,
      itemId,
    };
    const newState = reducer(state, actions.addRowItemId(payload));
    expect(newState).toEqual({
      [rowId]: {
        ...state[rowId],
        itemIds: state[rowId].itemIds.concat(itemId),
      },
    });
  });
});

describe('removeRowItemId', () => {
  const itemId2 = `${itemId}2`;

  it('does not throw when row itemIds is undefined', () => {
    const payload = {
      listId,
      rowId,
      itemId: itemId,
    };
    const newState = reducer(initialState, actions.removeRowItemId(payload));
    expect(newState).toEqual(initialState);
  });

  it('does not remove invalid item id', () => {
    const state = {
      [rowId]: row,
    };
    const payload = {
      listId,
      rowId,
      itemId: itemId2,
    };
    const newState = reducer(state, actions.removeRowItemId(payload));
    expect(newState).toEqual({
      [rowId]: {
        ...row,
        [DatabaseKey.itemIds]: [],
      },
    });
  });

  it('removes item id', () => {
    const state = {
      [rowId]: {
        ...row,
        [DatabaseKey.itemIds]: [itemId, itemId2],
      },
    };
    const payload = {
      listId,
      rowId,
      itemId,
    };
    const newState = reducer(state, actions.removeRowItemId(payload));
    expect(newState).toEqual({
      [rowId]: {
        ...row,
        [DatabaseKey.itemIds]: [itemId2],
      },
    });
  });

  it('removes all item ids', () => {
    const state = {
      [rowId]: {
        ...row,
        [DatabaseKey.itemIds]: [itemId],
      },
    };
    const payload = {
      listId,
      rowId,
      itemId,
    };
    const newState = reducer(state, actions.removeRowItemId(payload));
    expect(newState).toEqual({
      [rowId]: {
        ...row,
        [DatabaseKey.itemIds]: [],
      },
    });
  });
});

describe('setRowItemIds', () => {
  it('does nothing if payload does not contain rowItemIds', () => {
    const payload = {
      listId,
      rowItemIds: {},
    };
    expect(reducer(initialState, actions.setRowItemIds(payload))).toEqual(
      initialState,
    );
  });

  it('sets itemIds for a row', () => {
    const state = {
      [rowId]: row,
    };
    const payload = {
      listId,
      rowItemIds: {
        [rowId]: [itemId],
      },
    };
    expect(reducer(state, actions.setRowItemIds(payload))).toEqual({
      [rowId]: {
        ...row,
        [DatabaseKey.itemIds]: [itemId],
      },
    });
  });

  it('sets itemIds for rows', () => {
    const rowId2 = `${rowId}2`;
    const state = {
      [rowId]: row,
      [rowId2]: {
        ...row,
        [DatabaseKey.itemIds]: [itemId],
      },
    };
    const payload = {
      listId,
      rowItemIds: {
        [rowId]: [itemId],
        [rowId2]: [],
      },
    };
    expect(reducer(state, actions.setRowItemIds(payload))).toEqual({
      [rowId]: {
        ...row,
        [DatabaseKey.itemIds]: [itemId],
      },
      [rowId2]: {
        ...row,
        [DatabaseKey.itemIds]: [],
      },
    });
  });
});

describe('resetRows', () => {
  it('sets initialState', () => {
    const state = {
      [rowId]: row,
    };
    expect(reducer(state, actions.resetRows())).toEqual(initialState);
  });
});
