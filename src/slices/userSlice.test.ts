import { actions, reducer } from './userSlice';

describe('setUser', () => {
  it('returns state', () => {
    const state = { id: '' };
    const userId = 'user_id';
    expect(reducer(state, actions.setUser(userId))).toEqual({ id: userId });
  });
});
