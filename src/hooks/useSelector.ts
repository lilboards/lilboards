import {
  shallowEqual,
  useSelector as useReactReduxSelector,
} from 'react-redux';

import store from '../store';

import type { TypedUseSelectorHook } from 'react-redux';

type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = (
  selector,
  equalityFn = shallowEqual
) => useReactReduxSelector(selector, equalityFn);
