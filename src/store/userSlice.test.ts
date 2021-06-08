import { actions, initialState, reducer } from './userSlice';

const email = 'user@example.com';
const id = 'user_id';

describe('setUser', () => {
  it('sets user', () => {
    const state = initialState;
    expect(reducer(state, actions.setUser({ email, id }))).toEqual({
      ...state,
      email,
      id,
    });
  });
});

describe('resetUser', () => {
  it('sets initialState', () => {
    const state = {
      ...initialState,
      email,
      id,
    };
    expect(reducer(state, actions.resetUser())).toBe(initialState);
  });
});
