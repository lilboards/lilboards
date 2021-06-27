import {
  BOARD_TEST_ID,
  USER_TEST_EMAIL,
  USER_TEST_ID,
} from '../constants/test';
import { actions, initialState, reducer } from './userSlice';

const boardId = BOARD_TEST_ID;
const email = USER_TEST_EMAIL;
const id = USER_TEST_ID;

describe('setUser', () => {
  it('sets user', () => {
    const state = initialState;
    const payload = {
      email,
      id,
    };
    expect(reducer(state, actions.setUser(payload))).toEqual({
      ...state,
      email,
      id,
    });
  });
});

describe('toggleUserEditing', () => {
  it('sets editing boardId', () => {
    const state = initialState;
    const payload = { boardId };
    const newState = reducer(state, actions.toggleUserEditing(payload));
    expect(newState.editing).toEqual(payload);
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
