import { configureStore } from '@reduxjs/toolkit';

import {
  name as boardsReducerName,
  reducer as boardsReducer,
} from '../slices/boardsSlice';
import {
  name as columnsReducerName,
  reducer as columnsReducer,
} from '../slices/columnsSlice';
import {
  name as itemsReducerName,
  reducer as itemsReducer,
} from '../slices/itemsSlice';
import {
  name as likesReducerName,
  reducer as likesReducer,
} from '../slices/likesSlice';
import {
  name as userReducerName,
  reducer as userReducer,
} from '../slices/userSlice';

export const store = configureStore({
  reducer: {
    [boardsReducerName]: boardsReducer,
    [columnsReducerName]: columnsReducer,
    [itemsReducerName]: itemsReducer,
    [likesReducerName]: likesReducer,
    [userReducerName]: userReducer,
  },
});
