import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
  ITEM_TEST_ID as itemId,
  USER_TEST_EMAIL as email,
  USER_TEST_ID as id,
} from '../constants/test';
import { initialState, userSlice } from './userSlice';

export const { actions, reducer } = userSlice;

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
  it('sets boardId', () => {
    const payload = { boardId };
    const newState = reducer(initialState, actions.setUserEditing(payload));
    expect(newState.editing).toEqual({
      ...initialState.editing,
      ...payload,
    });
  });

  it('sets columnId', () => {
    const payload = { columnId };
    const newState = reducer(initialState, actions.setUserEditing(payload));
    expect(newState.editing).toEqual({
      ...initialState.editing,
      ...payload,
    });
  });

  it('sets itemId', () => {
    const payload = { itemId };
    const newState = reducer(initialState, actions.setUserEditing(payload));
    expect(newState.editing).toEqual({
      ...initialState.editing,
      ...payload,
    });
  });
});

describe('toggleUserHideLikes', () => {
  it('toggles hideLikes to true', () => {
    const state = {
      ...initialState,
    };
    const newState = reducer(state, actions.toggleUserHideLikes());
    expect(newState).toEqual({
      ...initialState,
      hideLikes: true,
    });
  });

  it('toggles hideLikes to false', () => {
    const state = {
      ...initialState,
      hideLikes: true,
    };
    const newState = reducer(state, actions.toggleUserHideLikes());
    expect(newState).toEqual({
      ...initialState,
      hideLikes: false,
    });
  });
});
