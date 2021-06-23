import { BOARD_TEST_ID, COLUMN_TEST_ID, ITEM_TEST_ID } from '../constants/test';
import { actions, initialState, reducer } from './columnsSlice';

const boardId = BOARD_TEST_ID;
const columnId = COLUMN_TEST_ID;
const itemId = ITEM_TEST_ID;

describe('addColumn', () => {
  it('adds column', () => {
    const newState = reducer(initialState, actions.addColumn(boardId));
    const column = Object.values(newState)[0];
    expect(column).toEqual({
      created: expect.any(Number),
      name: '',
      updated: expect.any(Number),
    });
    const id = Object.keys(newState)[0];
    expect({ id }).toMatchObject({ id: expect.any(String) });
  });
});

describe('editColumn', () => {
  it('edits column', () => {
    const state = {
      [columnId]: {
        created: 0,
        name: 'Column Name',
        updated: 0,
      },
    };
    const column = {
      boardId,
      columnId,
      name: 'Column Name Edited',
    };
    const newState = reducer(state, actions.editColumn(column));
    expect(newState).toMatchObject({
      [columnId]: {
        ...state[columnId],
        name: column.name,
        updated: expect.any(Number),
      },
    });
    expect(newState[columnId].updated).not.toBe(state[columnId].updated);
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
