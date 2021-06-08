import { actions, initialState, reducer } from './boardsSlice';

describe('addBoard', () => {
  it('adds board', () => {
    const state = initialState;
    const newState = reducer(state, actions.addBoard());
    const board = Object.values(newState)[0];
    expect(board).toEqual({
      focus: true,
      id: expect.any(String),
      name: '',
    });
    expect(newState).toHaveProperty(board.id);
  });
});

describe('editBoard', () => {
  it('edits board', () => {
    const id = 'board_id';
    const state = {
      [id]: {
        focus: true,
        id,
        name: 'Board Name',
      },
    };
    const board = {
      id,
      name: 'Board Name Edited',
    };
    expect(reducer(state, actions.editBoard(board))).toEqual({
      [id]: board,
    });
  });
});

describe('deleteBoard', () => {
  it('deletes board', () => {
    const id = 'board_id';
    const state = {
      [id]: {
        id,
        name: 'Board Name',
      },
    };
    expect(reducer(state, actions.deleteBoard(id))).toEqual({});
  });
});

describe('loadBoards', () => {
  it('does nothing if payload is null', () => {
    const state = initialState;
    const boards = null;
    expect(reducer(state, actions.loadBoards(boards))).toBe(state);
  });

  it('overrides boards', () => {
    const state = {
      board1: {
        id: 'board1',
        name: 'Board 1',
      },
    };
    const boards = {
      ...state,
      board2: {
        id: 'board2',
        name: 'Board 2',
      },
    };
    expect(reducer(state, actions.loadBoards(boards))).toBe(boards);
  });
});

describe('resetBoards', () => {
  it('sets initialState', () => {
    const state = {
      board_id: {
        id: 'board_id',
        name: 'Board Name',
      },
    };
    expect(reducer(state, actions.resetBoards())).toEqual(initialState);
  });
});
