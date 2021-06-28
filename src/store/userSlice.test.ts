import {
  BOARD_TEST_ID,
  COLUMN_TEST_ID,
  USER_TEST_EMAIL,
  USER_TEST_ID,
} from '../constants/test';
import { actions, initialState, reducer } from './userSlice';

const boardId = BOARD_TEST_ID;
const columnId = COLUMN_TEST_ID;
const email = USER_TEST_EMAIL;
const id = USER_TEST_ID;

describe('setUser', () => {
  it('sets user', () => {
    const payload = {
      email,
      id,
    };
    expect(reducer(initialState, actions.setUser(payload))).toEqual({
      ...initialState,
      email,
      id,
    });
  });
});

describe('toggleUserEditing', () => {
  it('sets editing boardId', () => {
    const payload = { boardId };
    const newState = reducer(initialState, actions.toggleUserEditing(payload));
    expect(newState.editing).toEqual({
      ...initialState.editing,
      ...payload,
    });
  });

  it('sets editing columnId', () => {
    const payload = { columnId };
    const newState = reducer(initialState, actions.toggleUserEditing(payload));
    expect(newState.editing).toEqual({
      ...initialState.editing,
      ...payload,
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
