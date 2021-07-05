import {
  BOARD_TEST_ID as boardId,
  USER_TEST_ID as userId,
} from '../constants/test';
import { actions, initialState, reducer } from './boardsSlice';

const board = {
  createdAt: Date.now(),
  creator: userId,
  name: '',
  updated: Date.now(),
};

describe('updateBoard', () => {
  it('defines property if board payload is empty', () => {
    const payload = {
      boardId,
      board: {},
    };
    const newState = reducer(initialState, actions.updateBoard(payload));
    expect(newState).toEqual({
      [boardId]: {},
    });
  });

  it('creates board', () => {
    const payload = {
      board,
      boardId,
    };
    const newState = reducer(initialState, actions.updateBoard(payload));
    expect(newState).toEqual({
      [boardId]: board,
    });
  });

  it('edits board', () => {
    const state = {
      [boardId]: board,
    };
    const payload = {
      board: {
        name: 'Board Name Edited',
        updated: Date.now() + 1000,
      },
      boardId,
    };
    const newState = reducer(state, actions.updateBoard(payload));
    expect(newState).toEqual({
      [boardId]: {
        ...state[boardId],
        ...payload.board,
      },
    });
  });
});

describe('deleteBoard', () => {
  it('deletes board', () => {
    const state = {
      [boardId]: board,
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
      ...board,
      id: undefined,
    };
    expect(reducer(initialState, actions.loadBoard(payload))).toBe(
      initialState
    );
  });

  it('loads board', () => {
    const state = {
      [`${boardId}1`]: board,
    };
    const id = `${boardId}2`;
    const board2 = {
      createdAt: Date.now(),
      creator: userId,
      name: 'Board 2',
      updated: Date.now(),
    };
    const newState = reducer(state, actions.loadBoard({ id, ...board2 }));
    expect(newState).toEqual({
      ...state,
      [id]: board2,
    });
  });
});

describe('resetBoards', () => {
  it('sets initialState', () => {
    const state = {
      [boardId]: board,
    };
    expect(reducer(state, actions.resetBoards())).toEqual(initialState);
  });
});
