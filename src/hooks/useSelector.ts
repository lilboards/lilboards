import type { TypedUseSelectorHook } from 'react-redux';
import {
  shallowEqual,
  useSelector as useReactReduxSelector,
} from 'react-redux';

import type { RootState } from '../types';

export const useSelector: TypedUseSelectorHook<RootState> = (
  selector,
  equalityFn = shallowEqual
) => useReactReduxSelector(selector, equalityFn);
