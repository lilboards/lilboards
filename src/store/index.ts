import { configureStore } from '@reduxjs/toolkit';

import {
  name as boardsReducerName,
  reducer as boardsReducer,
} from './boardsSlice';
import { name as userReducerName, reducer as userReducer } from './userSlice';

const store = configureStore({
  reducer: {
    [boardsReducerName]: boardsReducer,
    [userReducerName]: userReducer,
  },
});

export default store;
