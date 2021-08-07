import { createSlice } from '@reduxjs/toolkit';

import { USER } from '../constants';
import { firebaseAnalytics } from '../firebase';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types';

export const initialState: User = {
  editing: {
    boardId: '',
    columnId: '',
    itemId: '',
  },
  email: null,
  emailVerified: false,
  id: '',
};

export const name = USER;

const userSlice = createSlice({
  name,
  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      const user = action.payload;
      Object.assign(state, user);
      if (user.id) {
        firebaseAnalytics.setUserId(user.id);
      }
    },

    setUserEditing: (
      state,
      action: PayloadAction<Partial<User['editing']>>
    ) => {
      Object.assign(state.editing, action.payload);
    },

    resetUser: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = userSlice;
