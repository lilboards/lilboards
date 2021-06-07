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
