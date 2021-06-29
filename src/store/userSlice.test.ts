import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
  USER_TEST_EMAIL as email,
  USER_TEST_ID as id,
} from '../constants/test';
import { actions, initialState, reducer } from './userSlice';

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

describe('setUserEditing', () => {
  it('sets editing boardId', () => {
    const payload = { boardId };
    const newState = reducer(initialState, actions.setUserEditing(payload));
    expect(newState.editing).toEqual({
      ...initialState.editing,
      ...payload,
    });
  });

  it('sets editing columnId', () => {
    const payload = { columnId };
    const newState = reducer(initialState, actions.setUserEditing(payload));
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
