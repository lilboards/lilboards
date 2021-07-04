import {
  BOARD_TEST_ID as boardId,
  USER_TEST_ID as userId,
} from '../constants/test';
import { actions, initialState, reducer } from './boardsSlice';

describe('updateBoard', () => {
  it('creates board', () => {
    const board = {
      created: Date.now(),
      name: '',
      updated: Date.now(),
    };
    const payload = {
      ...board,
      boardId,
    };
    const newState = reducer(initialState, actions.updateBoard(payload));
    expect(newState).toEqual({ [boardId]: board });
  });

  it('edits board name and updated', () => {
    const state = {
      [boardId]: {
        created: Date.now(),
        name: 'Board Name',
        updated: Date.now(),
      },
    };
    const board = {
      name: 'Board Name Edited',
      updated: Date.now() + 1000,
    };
    const payload = {
      ...board,
      boardId,
    };
    const newState = reducer(state, actions.updateBoard(payload));
    expect(newState).toEqual({
      [boardId]: {
        ...state[boardId],
        ...board,
      },
    });
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
      [`${boardId}1`]: {
        created: 0,
        name: 'Board 1',
        updated: 0,
      },
    };
    const id = `${boardId}2`;
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
      [boardId]: {
        created: 0,
        name: 'Board Name',
        updated: 0,
      },
    };
    expect(reducer(state, actions.resetBoards())).toEqual(initialState);
  });
});
