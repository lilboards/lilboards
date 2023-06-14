import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector as useReactReduxSelector } from 'react-redux';

import type { RootState } from '../types';

export const useSelector: TypedUseSelectorHook<RootState> =
  useReactReduxSelector;
