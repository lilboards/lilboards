import { BOARD_TEST_ID, COLUMN_TEST_ID, ITEM_TEST_ID } from '../constants/test';
import { actions, initialState, reducer } from './columnsSlice';

const boardId = BOARD_TEST_ID;
const columnId = COLUMN_TEST_ID;
const itemId = ITEM_TEST_ID;

describe('editColumn', () => {
  it('adds column', () => {
    const column = {
      created: Date.now(),
      name: '',
      updated: Date.now(),
    };
    const payload = {
      ...column,
      columnId,
    };
    const newState = reducer(initialState, actions.editColumn(payload));
    expect(newState).toEqual({ [columnId]: column });
  });

  it('edits column', () => {
    const state = {
      [columnId]: {
        created: Date.now(),
        name: 'Column Name',
        updated: Date.now(),
      },
    };
    const column = {
      name: 'Column Name Edited',
      updated: Date.now() + 1000,
    };
    const payload = {
      ...column,
      columnId,
    };
    const newState = reducer(state, actions.editColumn(payload));
    expect(newState).toEqual({
      [columnId]: {
        ...state[columnId],
        ...column,
      },
    });
  });
});

describe('deleteColumn', () => {
  it('deletes column', () => {
    const state = {
      [columnId]: {
        created: 0,
        name: 'Column Name',
        updated: 0,
      },
    };

    const payload = {
      boardId,
      columnId,
    };

    expect(reducer(state, actions.deleteColumn(payload))).toEqual({});
  });
});

describe('loadColumns', () => {
  it('loads columns', () => {
    const payload = {
      [columnId]: {
        created: 0,
        name: 'Column Name',
        updated: 0,
      },
    };
    const newState = reducer(initialState, actions.loadColumns(payload));
    expect(newState).toBe(payload);
  });
});

describe('addColumnItemId', () => {
  it('appends item id to column', () => {
    const state = {
      [columnId]: {
        created: 0,
        name: 'Column 1',
        updated: 0,
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
        itemIds: [itemId],
      },
    });
  });

  it('appends item id to column with item ids', () => {
    const state = {
      [columnId]: {
        created: 0,
        itemIds: [`${itemId}1`],
        name: 'Column 1',
        updated: 0,
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

describe('resetColumns', () => {
  it('sets initialState', () => {
    const state = {
      [columnId]: {
        created: 0,
        name: 'Column Name',
        updated: 0,
      },
    };
    expect(reducer(state, actions.resetColumns())).toEqual(initialState);
  });
});
