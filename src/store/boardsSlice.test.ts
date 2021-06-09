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
        created: Date.now(),
        focus: true,
        name: 'Board Name',
        updated: Date.now(),
      },
    };
    const board = {
      id,
      name: 'Board Name Edited',
    };
    const newState = reducer(state, actions.editBoard(board));
    expect(newState).toEqual({
      [id]: {
        ...state[id],
        name: board.name,
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
        created: Date.now(),
        name: 'Board Name',
        updated: Date.now(),
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
      created: Date.now(),
      id: undefined,
      name: 'Board',
      updated: Date.now(),
    };
    expect(reducer(initialState, actions.loadBoard(payload))).toBe(
      initialState
    );
  });

  it('loads board', () => {
    const state = {
      board1: {
        created: Date.now(),
        name: 'Board 1',
        updated: Date.now(),
      },
    };
    const id = 'board_id';
    const board = {
      created: Date.now(),
      name: 'Board 2',
      updated: Date.now(),
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
        created: Date.now(),
        name: 'Board Name',
        updated: Date.now(),
      },
    };
    expect(reducer(state, actions.resetBoards())).toEqual(initialState);
  });
});
