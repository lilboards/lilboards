import { configureStore } from '@reduxjs/toolkit';
import {
  name as userReducerName,
  reducer as userReducer,
} from '../slices/userSlice';

const store = configureStore({
  reducer: {
    [userReducerName]: userReducer,
  },
});

export default store;
