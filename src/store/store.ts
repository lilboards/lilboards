import { configureStore } from '@reduxjs/toolkit';

import {
  boardsSlice,
  columnsSlice,
  itemsSlice,
  likesSlice,
  userSlice,
} from '../slices';

export const store = configureStore({
  reducer: {
    [boardsSlice.name]: boardsSlice.reducer,
    [columnsSlice.name]: columnsSlice.reducer,
    [itemsSlice.name]: itemsSlice.reducer,
    [likesSlice.name]: likesSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
});
