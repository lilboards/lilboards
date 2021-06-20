/* istanbul ignore file */
import 'firebase/database';

import { firebaseApp } from './app';
import { isDevelopment, isLocalhost } from '../config';
import { BOARDS, COLUMNS } from '../constants';

import type { Id } from '../types';

const firebaseDatabase = firebaseApp.database();

if (isDevelopment && isLocalhost) {
  const databaseUrl = new URL(
    process.env.REACT_APP_FIREBASE_DATABASE_URL || ''
  );
  firebaseDatabase.useEmulator(databaseUrl.hostname, Number(databaseUrl.port));
}

export const boardsRef = firebaseDatabase.ref(BOARDS);
export const usersRef = firebaseDatabase.ref('users');

export const getBoardRef = (boardId: Id) => boardsRef.child(boardId);

export const getBoardVal = async (boardId: Id) =>
  (await getBoardRef(boardId).get()).val();

export const getColumnsRef = (boardId: Id) =>
  getBoardRef(boardId).child(COLUMNS);

export const getColumnRef = (boardId: Id, columnId: Id) =>
  getColumnsRef(boardId).child(columnId);

export const getUserRef = (userId: Id) => usersRef.child(userId);

export const getUserBoardsVal = async (userId: Id) =>
  (await getUserRef(userId).child(BOARDS).get()).val();
