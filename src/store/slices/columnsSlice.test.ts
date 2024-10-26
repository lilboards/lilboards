import { DatabaseKey } from 'src/constants';
import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from 'test/constants';

import { columnsSlice, initialState } from './columnsSlice';

const { actions, reducer } = columnsSlice;

const column = {
  createdAt: Date.now(),
  createdBy: userId,
  name: '',
};

describe('updateColumn', () => {
  it('does nothing if column payload is empty', () => {
    const state = {
      [columnId]: column,
    };
    const payload = {
      boardId,
      column: {},
      columnId,
    };
    const newState = reducer(state, actions.updateColumn(payload));
    expect(newState).toBe(state);
  });

  it('adds column', () => {
    const payload = {
      boardId,
      column,
      columnId,
    };
    const newState = reducer(initialState, actions.updateColumn(payload));
    expect(newState).toEqual({
      [columnId]: column,
    });
  });

  it.each([true, false])('updates column with debounce=%p', (debounce) => {
    const state = {
      [columnId]: column,
    };
    const payload = {
      boardId,
      column: {
        name: 'Edited Column',
        updatedAt: Date.now() + 1000,
      },
      columnId,
      debounce,
    };
    const newState = reducer(state, actions.updateColumn(payload));
    expect(newState).toEqual({
      [columnId]: {
        ...column,
        ...payload.column,
      },
    });
  });

  it('replaces itemIds with payload itemIds', () => {
    const state = {
      [columnId]: {
        ...column,
        itemIds: ['foo', 'bar'],
      },
    };
    const payload = {
      boardId,
      column: {
        itemIds: [itemId],
      },
      columnId,
      debounce: true,
      skipSave: true,
    };
    const newState = reducer(state, actions.updateColumn(payload));
    expect(newState).toEqual({
      [columnId]: {
        ...column,
        ...payload.column,
      },
    });
  });

  it('deletes itemIds when itemIds is empty in payload', () => {
    const state = {
      [columnId]: {
        ...column,
        itemIds: [itemId],
      },
    };
    const payload = {
      boardId,
      column: {},
      columnId,
      debounce: true,
      skipSave: true,
    };
    const newState = reducer(state, actions.updateColumn(payload));
    expect(newState).toEqual({
      [columnId]: column,
    });
  });
});

describe('renameColumn', () => {
  it('sets column name', () => {
    const payload = {
      boardId,
      columnId,
      columnName: 'New Column',
      userId,
    };
    const newState = reducer(initialState, actions.renameColumn(payload));
    expect(newState).toEqual({
      [columnId]: {
        name: payload.columnName,
        updatedAt: expect.any(Number),
        updatedBy: payload.userId,
      },
    });
  });

  it.each([true, false])('updates column name with debounce=%p', (debounce) => {
    const state = {
      [columnId]: column,
    };
    const payload = {
      boardId,
      columnId,
      columnName: 'Updated Column',
      debounce,
      userId: `${userId}_2`,
    };
    expect(reducer(state, actions.renameColumn(payload))).toEqual({
      [columnId]: {
        ...column,
        name: payload.columnName,
        updatedAt: expect.any(Number),
        updatedBy: payload.userId,
      },
    });
  });
});

describe('removeColumn', () => {
  it('deletes column', () => {
    const state = {
      [columnId]: column,
    };
    const payload = {
      boardId,
      columnId,
    };
    expect(reducer(state, actions.removeColumn(payload))).toEqual({});
  });

  it('deletes column with skip save', () => {
    const state = {
      [columnId]: column,
      [`${columnId}2`]: column,
    };
    const payload = {
      boardId,
      columnId,
      skipSave: true,
    };
    expect(reducer(state, actions.removeColumn(payload))).toEqual({
      [`${columnId}2`]: column,
    });
  });
});

describe('addColumnItemId', () => {
  it('appends item id to column', () => {
    const state = {
      [columnId]: column,
    };
    const payload = {
      boardId,
      columnId,
      itemId,
    };
    const newState = reducer(state, actions.addColumnItemId(payload));
    expect(newState).toEqual({
      [columnId]: {
        ...state[columnId],
        itemIds: [itemId],
      },
    });
  });

  it('appends item id to column with item ids', () => {
    const state = {
      [columnId]: {
        ...column,
        itemIds: [`${itemId}1`],
        name: 'Column 1',
      },
    };
    const payload = {
      boardId,
      columnId,
      itemId,
    };
    const newState = reducer(state, actions.addColumnItemId(payload));
    expect(newState).toEqual({
      [columnId]: {
        ...state[columnId],
        itemIds: state[columnId].itemIds.concat(itemId),
      },
    });
  });
});

describe('removeColumnItemId', () => {
  const itemId2 = `${itemId}2`;

  it('does not throw when column itemIds is undefined', () => {
    const payload = {
      boardId,
      columnId,
      itemId: itemId,
    };
    const newState = reducer(initialState, actions.removeColumnItemId(payload));
    expect(newState).toEqual(initialState);
  });

  it('does not remove invalid item id', () => {
    const state = {
      [columnId]: column,
    };
    const payload = {
      boardId,
      columnId,
      itemId: itemId2,
    };
    const newState = reducer(state, actions.removeColumnItemId(payload));
    expect(newState).toEqual({
      [columnId]: {
        ...column,
        [DatabaseKey.itemIds]: [],
      },
    });
  });

  it('removes item id', () => {
    const state = {
      [columnId]: {
        ...column,
        [DatabaseKey.itemIds]: [itemId, itemId2],
      },
    };
    const payload = {
      boardId,
      columnId,
      itemId,
    };
    const newState = reducer(state, actions.removeColumnItemId(payload));
    expect(newState).toEqual({
      [columnId]: {
        ...column,
        [DatabaseKey.itemIds]: [itemId2],
      },
    });
  });

  it('removes all item ids', () => {
    const state = {
      [columnId]: {
        ...column,
        [DatabaseKey.itemIds]: [itemId],
      },
    };
    const payload = {
      boardId,
      columnId,
      itemId,
    };
    const newState = reducer(state, actions.removeColumnItemId(payload));
    expect(newState).toEqual({
      [columnId]: {
        ...column,
        [DatabaseKey.itemIds]: [],
      },
    });
  });
});

describe('setColumnItemIds', () => {
  it('does nothing if payload does not contain columnItemIds', () => {
    const payload = {
      boardId,
      columnItemIds: {},
    };
    expect(reducer(initialState, actions.setColumnItemIds(payload))).toEqual(
      initialState,
    );
  });

  it('sets itemIds for a column', () => {
    const state = {
      [columnId]: column,
    };
    const payload = {
      boardId,
      columnItemIds: {
        [columnId]: [itemId],
      },
    };
    expect(reducer(state, actions.setColumnItemIds(payload))).toEqual({
      [columnId]: {
        ...column,
        [DatabaseKey.itemIds]: [itemId],
      },
    });
  });

  it('sets itemIds for columns', () => {
    const columnId2 = `${columnId}2`;
    const state = {
      [columnId]: column,
      [columnId2]: {
        ...column,
        [DatabaseKey.itemIds]: [itemId],
      },
    };
    const payload = {
      boardId,
      columnItemIds: {
        [columnId]: [itemId],
        [columnId2]: [],
      },
    };
    expect(reducer(state, actions.setColumnItemIds(payload))).toEqual({
      [columnId]: {
        ...column,
        [DatabaseKey.itemIds]: [itemId],
      },
      [columnId2]: {
        ...column,
        [DatabaseKey.itemIds]: [],
      },
    });
  });
});

describe('resetColumns', () => {
  it('sets initialState', () => {
    const state = {
      [columnId]: column,
    };
    expect(reducer(state, actions.resetColumns())).toEqual(initialState);
  });
});
