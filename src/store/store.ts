import { configureStore } from '@reduxjs/toolkit';
import { isDevelopment } from 'src/config';

import {
  boardsSlice,
  columnsSlice,
  itemsSlice,
  likesSlice,
  listItemsSlice,
  listsSlice,
  rowsSlice,
  userSlice,
} from './slices';

export const store = configureStore({
  reducer: {
    [boardsSlice.name]: boardsSlice.reducer,
    [columnsSlice.name]: columnsSlice.reducer,
    [itemsSlice.name]: itemsSlice.reducer,
    [likesSlice.name]: likesSlice.reducer,
    [listItemsSlice.name]: listItemsSlice.reducer,
    [listsSlice.name]: listsSlice.reducer,
    [rowsSlice.name]: rowsSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  devTools: isDevelopment,
});
