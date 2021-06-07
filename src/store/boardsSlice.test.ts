import { actions, initialState, reducer } from './boardsSlice';

describe('addBoard', () => {
  it('adds board', () => {
    const state = initialState;
    const board = {
      id: 'board_id',
      name: 'Board Name',
    };
    expect(reducer(state, actions.addBoard(board))).toEqual({
      [board.id]: board,
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
