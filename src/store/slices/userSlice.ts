import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { setUserId } from '../../firebase';
import type { User } from '../../types';

export const initialState: User = {
  editing: {
    boardId: '',
    columnId: '',
    itemId: '',
  },
  email: null,
  emailVerified: false,
  hideLikes: false,
  id: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    resetUser: () => {
      return initialState;
    },

    setUser: (state, action: PayloadAction<Partial<User>>) => {
      const user = action.payload;
      Object.assign(state, user);
      if (user.id) {
        setUserId(user.id);
      }
    },

    setUserEditing: (
      state,
      action: PayloadAction<Partial<User['editing']>>
    ) => {
      Object.assign(state.editing, action.payload);
    },

    toggleUserHideLikes: (state) => {
      state.hideLikes = !state.hideLikes;
    },
  },
});
