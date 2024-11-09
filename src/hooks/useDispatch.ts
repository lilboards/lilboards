import { useDispatch as useReactReduxDispatch } from 'react-redux';
import { store } from 'src/store';

export const useDispatch = () => useReactReduxDispatch<typeof store.dispatch>();
