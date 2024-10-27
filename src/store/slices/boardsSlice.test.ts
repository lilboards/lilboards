import { boardId, userId } from 'test/constants';

import { boardsSlice, initialState } from './boardsSlice';

const { actions, reducer } = boardsSlice;

const board = {
  createdAt: Date.now(),
  createdBy: userId,
  name: '',
  updatedAt: Date.now(),
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

  it('updates board', () => {
    const state = {
      [boardId]: board,
    };
    const payload = {
      board: {
        name: 'Board Name Updated',
        updatedAt: Date.now() + 1000,
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

  it.each([{ skipSave: true }, { debounce: true }])(
    'updates board when %j',
    (actionPayload) => {
      const state = {
        [boardId]: board,
      };

      const payload = {
        ...actionPayload,
        board: {
          name: 'Board Name Updated',
          updatedAt: Date.now() + 1000,
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
    },
  );
});

describe('deleteBoard', () => {
  it('deletes board', () => {
    const state = {
      [boardId]: board,
    };
    const payload = { boardId, userId };
    expect(reducer(state, actions.deleteBoard(payload))).toEqual({});
  });

  it('deletes board when skipSave is true', () => {
    const state = {
      [boardId]: board,
    };
    const payload = { boardId, userId, skipSave: true };
    expect(reducer(state, actions.deleteBoard(payload))).toEqual({});
  });
});

describe('loadBoard', () => {
  it('loads board into empty state', () => {
    const state = {};
    const payload = {
      board,
      boardId,
    };
    const newState = reducer(state, actions.loadBoard(payload));
    expect(newState).toEqual({
      [boardId]: board,
    });
  });

  it('loads board into existing state', () => {
    const state = {
      [`${boardId}1`]: board,
    };
    const id2 = `${boardId}2`;
    const board2 = {
      createdAt: Date.now(),
      createdBy: userId,
      name: 'Board 2',
      updatedAt: Date.now(),
    };
    const payload = {
      board: board2,
      boardId: id2,
    };
    const newState = reducer(state, actions.loadBoard(payload));
    expect(newState).toEqual({
      ...state,
      [id2]: board2,
    });
  });

  it('overrides board', () => {
    const state = {
      [boardId]: board,
    };
    const board2 = {
      createdAt: Date.now(),
      createdBy: userId,
      name: 'Board 2',
      updatedAt: Date.now(),
    };
    const payload = {
      board: board2,
      boardId,
    };
    const newState = reducer(state, actions.loadBoard(payload));
    expect(newState).toEqual({
      [boardId]: board2,
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
