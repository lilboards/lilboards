import { LIST_TEST_ID as listId, USER_TEST_ID as userId } from 'test/constants';

import { initialState, listsSlice } from './listsSlice';

const { actions, reducer } = listsSlice;

const list = {
  createdAt: Date.now(),
  createdBy: userId,
  name: '',
  updatedAt: Date.now(),
};

describe('updateList', () => {
  it('defines property if list payload is empty', () => {
    const payload = {
      listId,
      list: {},
    };
    const newState = reducer(initialState, actions.updateList(payload));
    expect(newState).toEqual({
      [listId]: {},
    });
  });

  it('creates list', () => {
    const payload = {
      list,
      listId,
    };
    const newState = reducer(initialState, actions.updateList(payload));
    expect(newState).toEqual({
      [listId]: list,
    });
  });

  it('updates list', () => {
    const state = {
      [listId]: list,
    };
    const payload = {
      list: {
        name: 'List Name Updated',
        updatedAt: Date.now() + 1000,
      },
      listId,
    };
    const newState = reducer(state, actions.updateList(payload));
    expect(newState).toEqual({
      [listId]: {
        ...state[listId],
        ...payload.list,
      },
    });
  });

  it.each([{ skipSave: true }, { debounce: true }])(
    'updates list when %j',
    (actionPayload) => {
      const state = {
        [listId]: list,
      };

      const payload = {
        ...actionPayload,
        list: {
          name: 'List Name Updated',
          updatedAt: Date.now() + 1000,
        },
        listId,
      };

      const newState = reducer(state, actions.updateList(payload));

      expect(newState).toEqual({
        [listId]: {
          ...state[listId],
          ...payload.list,
        },
      });
    },
  );
});

describe('deleteList', () => {
  it('deletes list', () => {
    const state = {
      [listId]: list,
    };
    const payload = { listId, userId };
    expect(reducer(state, actions.deleteList(payload))).toEqual({});
  });

  it('deletes list when skipSave is true', () => {
    const state = {
      [listId]: list,
    };
    const payload = { listId, userId, skipSave: true };
    expect(reducer(state, actions.deleteList(payload))).toEqual({});
  });
});

describe('loadList', () => {
  it('loads list into empty state', () => {
    const state = {};
    const payload = {
      list,
      listId,
    };
    const newState = reducer(state, actions.loadList(payload));
    expect(newState).toEqual({
      [listId]: list,
    });
  });

  it('loads list into existing state', () => {
    const state = {
      [`${listId}1`]: list,
    };
    const id2 = `${listId}2`;
    const list2 = {
      createdAt: Date.now(),
      createdBy: userId,
      name: 'List 2',
      updatedAt: Date.now(),
    };
    const payload = {
      list: list2,
      listId: id2,
    };
    const newState = reducer(state, actions.loadList(payload));
    expect(newState).toEqual({
      ...state,
      [id2]: list2,
    });
  });

  it('overrides list', () => {
    const state = {
      [listId]: list,
    };
    const list2 = {
      createdAt: Date.now(),
      createdBy: userId,
      name: 'List 2',
      updatedAt: Date.now(),
    };
    const payload = {
      list: list2,
      listId,
    };
    const newState = reducer(state, actions.loadList(payload));
    expect(newState).toEqual({
      [listId]: list2,
    });
  });
});

describe('resetLists', () => {
  it('sets initialState', () => {
    const state = {
      [listId]: list,
    };
    expect(reducer(state, actions.resetLists())).toEqual(initialState);
  });
});
