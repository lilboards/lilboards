import { configureStore } from '@reduxjs/toolkit';

import {
  name as boardsReducerName,
  reducer as boardsReducer,
} from './boardsSlice';
import {
  name as columnsReducerName,
  reducer as columnsReducer,
} from './columnsSlice';
import {
  name as itemsReducerName,
  reducer as itemsReducer,
} from './itemsSlice';
import {
  name as likesReducerName,
  reducer as likesReducer,
} from './likesSlice';
import { name as userReducerName, reducer as userReducer } from './userSlice';

const store = configureStore({
  reducer: {
    [boardsReducerName]: boardsReducer,
    [columnsReducerName]: columnsReducer,
    [itemsReducerName]: itemsReducer,
    [likesReducerName]: likesReducer,
    [userReducerName]: userReducer,
  },
});

export default store;
