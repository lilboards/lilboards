import { ITEM_IDS } from '../constants';
import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../constants/test';
import { actions, initialState, reducer } from './columnsSlice';

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
    expect(newState).toEqual({ [columnId]: column });
  });

  it('edits column', () => {
    const state = {
      [columnId]: column,
    };
    const payload = {
      boardId,
      column: {
        name: 'Column Name Edited',
        updatedAt: Date.now() + 1000,
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
        [ITEM_IDS]: [],
      },
    });
  });

  it('removes item id', () => {
    const state = {
      [columnId]: {
        ...column,
        [ITEM_IDS]: [itemId, itemId2],
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
        [ITEM_IDS]: [itemId2],
      },
    });
  });

  it('removes all item ids', () => {
    const state = {
      [columnId]: {
        ...column,
        [ITEM_IDS]: [itemId],
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
        [ITEM_IDS]: [],
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
      initialState
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
        [ITEM_IDS]: [itemId],
      },
    });
  });

  it('sets itemIds for columns', () => {
    const columnId2 = `${columnId}2`;
    const state = {
      [columnId]: column,
      [columnId2]: {
        ...column,
        [ITEM_IDS]: [itemId],
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
        [ITEM_IDS]: [itemId],
      },
      [columnId2]: {
        ...column,
        [ITEM_IDS]: [],
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
