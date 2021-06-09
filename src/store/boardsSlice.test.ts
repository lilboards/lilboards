import { actions, initialState, reducer } from './boardsSlice';

const userId = 'user_id';

describe('addBoard', () => {
  it('adds board', () => {
    const newState = reducer(initialState, actions.addBoard(userId));
    const board = Object.values(newState)[0];
    expect(board).toEqual({
      created: expect.any(Number),
      focus: true,
      name: '',
      updated: expect.any(Number),
    });
    const id = Object.keys(newState)[0];
    expect({ id }).toMatchObject({ id: expect.any(String) });
  });
});

describe('editBoard', () => {
  it('edits board', () => {
    const id = 'board_id';
    const state = {
      [id]: {
        created: 0,
        focus: true,
        name: 'Board Name',
        updated: 0,
      },
    };
    const board = {
      id,
      name: 'Board Name Edited',
    };
    const newState = reducer(state, actions.editBoard(board));
    expect(newState).toMatchObject({
      [id]: {
        ...state[id],
        name: board.name,
        updated: expect.any(Number),
      },
    });
    expect(newState).not.toHaveProperty('focus');
  });
});

describe('deleteBoard', () => {
  it('deletes board', () => {
    const id = 'board_id';
    const state = {
      [id]: {
        created: 0,
        name: 'Board Name',
        updated: 0,
      },
    };
    const payload = { id, userId };
    expect(reducer(state, actions.deleteBoard(payload))).toEqual({});
  });
});

describe('loadBoard', () => {
  it('does nothing if payload is null', () => {
    expect(reducer(initialState, actions.loadBoard(null))).toBe(initialState);
  });

  it('does nothing if board id is undefined', () => {
    const payload = {
      created: 0,
      id: undefined,
      name: 'Board',
      updated: 0,
    };
    expect(reducer(initialState, actions.loadBoard(payload))).toBe(
      initialState
    );
  });

  it('loads board', () => {
    const state = {
      board1: {
        created: 0,
        name: 'Board 1',
        updated: 0,
      },
    };
    const id = 'board_id';
    const board = {
      created: 0,
      name: 'Board 2',
      updated: 0,
    };
    expect(reducer(state, actions.loadBoard({ id, ...board }))).toEqual({
      ...state,
      [id]: board,
    });
  });
});

describe('resetBoards', () => {
  it('sets initialState', () => {
    const state = {
      board_id: {
        created: 0,
        name: 'Board Name',
        updated: 0,
      },
    };
    expect(reducer(state, actions.resetBoards())).toEqual(initialState);
  });
});
