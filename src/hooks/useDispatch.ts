import { useDispatch as useReactReduxDispatch } from 'react-redux';

import { store } from '../store';

export const useDispatch = () => useReactReduxDispatch<typeof store.dispatch>();
