import { BOARD_TEST_ID, USER_TEST_ID } from '../constants/test';
import { actions, initialState, reducer } from './boardsSlice';

const boardId = BOARD_TEST_ID;
const userId = USER_TEST_ID;

describe('addBoard', () => {
  it('adds board', () => {
    const payload = {
      boardId,
      userId,
    };
    const newState = reducer(initialState, actions.addBoard(payload));
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
  const state = {
    [boardId]: {
      created: 0,
      focus: true,
      name: 'Board Name',
      updated: 0,
    },
  };

  const payload = {
    boardId,
    name: 'Board Name Edited',
  };

  it('edits board', () => {
    const newState = reducer(state, actions.editBoard(payload));
    expect(newState).toMatchObject({
      [boardId]: {
        ...state[boardId],
        name: payload.name,
        updated: expect.any(Number),
      },
    });
    expect(newState[boardId].updated).not.toBe(state[boardId].updated);
    expect(newState).not.toHaveProperty('focus');
  });
});

describe('deleteBoard', () => {
  it('deletes board', () => {
    const state = {
      [boardId]: {
        created: 0,
        name: 'Board Name',
        updated: 0,
      },
    };
    const payload = { boardId, userId };
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
      [`${BOARD_TEST_ID}1`]: {
        created: 0,
        name: 'Board 1',
        updated: 0,
      },
    };
    const id = `${BOARD_TEST_ID}2`;
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
