import { actions, initialState, reducer } from './userSlice';

describe('setUser', () => {
  it('sets user id', () => {
    const state = initialState;
    const id = 'user_id';
    expect(reducer(state, actions.setUser(id))).toEqual({
      ...state,
      id,
    });
  });
});

describe('resetUser', () => {
  it('sets initialState', () => {
    const id = 'user_id';
    const state = { ...initialState, id };
    expect(reducer(state, actions.resetUser())).toEqual(initialState);
  });
});
