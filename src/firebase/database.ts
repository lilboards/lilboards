/* istanbul ignore file */
import 'firebase/database';

import { firebaseApp } from './app';
import { isDevelopment, isLocalhost } from '../config';
import { BOARDS, COLUMNS, USERS } from '../constants';

import type { Board, Id } from '../types';

const firebaseDatabase = firebaseApp.database();

if (isDevelopment && isLocalhost) {
  const databaseUrl = new URL(
    process.env.REACT_APP_FIREBASE_DATABASE_URL || ''
  );
  firebaseDatabase.useEmulator(databaseUrl.hostname, Number(databaseUrl.port));
}

/**
 * Boards.
 */
export const boardsRef = firebaseDatabase.ref(BOARDS);

/**
 * Board.
 */
export const getBoardRef = (boardId: Id) => boardsRef.child(boardId);

export const getBoardVal = async (boardId: Id): Promise<Board | null> =>
  (await getBoardRef(boardId).get()).val();

/**
 * Column.
 */
export const getColumnsRef = (boardId: Id) =>
  getBoardRef(boardId).child(COLUMNS);

export const getColumnRef = (boardId: Id, columnId: Id) =>
  getColumnsRef(boardId).child(columnId);

/**
 * Users.
 */
export const usersRef = firebaseDatabase.ref(USERS);

/**
 * User.
 */
export const getUserRef = (userId: Id) => usersRef.child(userId);

export const getUserBoardsRef = (userId: Id) =>
  getUserRef(userId).child(BOARDS);

export const getUserBoardsVal = async (
  userId: Id
): Promise<{ [boardId: string]: boolean } | null> =>
  (await getUserBoardsRef(userId).get()).val();

export const getUserBoardRef = (userId: Id, boardId: Id) =>
  getUserRef(userId).child(BOARDS).child(boardId);
