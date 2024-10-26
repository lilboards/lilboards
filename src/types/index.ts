import { store } from '../store';

export type RootState = ReturnType<typeof store.getState>;

export * from './board';
export * from './id';
export * from './list';
export * from './user';
