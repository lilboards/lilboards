import { actions, initialState, reducer } from './columnsSlice';

describe('addColumn', () => {
  it('adds column', () => {
    const boardId = 'board_id';
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

describe('loadColumns', () => {
  it('loads columns', () => {
    const payload = {
      column1: {
        created: Date.now(),
        name: 'Column 1',
        updated: Date.now(),
      },
    };
    const newState = reducer(initialState, actions.loadColumns(payload));
    expect(newState).toBe(payload);
  });
});

describe('resetColumns', () => {
  it('sets initialState', () => {
    const state = {
      board_id: {
        created: 0,
        name: 'Column Name',
        updated: 0,
      },
    };
    expect(reducer(state, actions.resetColumns())).toEqual(initialState);
  });
});
