/* istanbul ignore file */
import 'firebase/database';

import { firebaseApp } from './app';
import { isDevelopment, isLocalhost } from '../config';
import { BOARD, BOARDS, COLUMNS, ITEM_IDS, ITEMS, USERS } from '../constants';

import type { Board, Id } from '../types';

const firebaseDatabase = firebaseApp.database();

if (isDevelopment && isLocalhost) {
  const databaseUrl = new URL(
    process.env.REACT_APP_FIREBASE_DATABASE_URL || ''
  );
  firebaseDatabase.useEmulator(databaseUrl.hostname, Number(databaseUrl.port));
}

const rootRef = firebaseDatabase.ref();

export const generateId = () => rootRef.push().key as Id;

/**
 * Boards.
 */
export const boardsRef = firebaseDatabase.ref(BOARDS);

export const getBoardRef = (boardId: Id) => boardsRef.child(boardId);

export const getBoardDataRef = (boardId: Id) =>
  getBoardRef(boardId).child(BOARD);

export const getBoardVal = async (boardId: Id): Promise<Board | null> =>
  (await getBoardDataRef(boardId).get()).val();

export const saveBoardData = (boardId: Id, board: any) =>
  getBoardDataRef(boardId).update(board);

/**
 * Columns.
 */
export const getColumnsRef = (boardId: Id) =>
  getBoardRef(boardId).child(COLUMNS);

export const getColumnRef = (boardId: Id, columnId: Id) =>
  getColumnsRef(boardId).child(columnId);

export const getColumnItemIdsRef = (boardId: Id, columnId: Id) =>
  getColumnRef(boardId, columnId).child(ITEM_IDS);

/**
 * Items.
 */
export const getItemsRef = (boardId: Id) => getBoardRef(boardId).child(ITEMS);

export const getItemRef = (boardId: Id, itemId: Id) =>
  getItemsRef(boardId).child(itemId);

/**
 * Users.
 */
export const usersRef = firebaseDatabase.ref(USERS);

export const getUserRef = (userId: Id) => usersRef.child(userId);

export const getUserBoardsRef = (userId: Id) =>
  getUserRef(userId).child(BOARDS);

export const getUserBoardsVal = async (
  userId: Id
): Promise<{ [boardId: string]: boolean } | null> =>
  (await getUserBoardsRef(userId).get()).val();

export const getUserBoardRef = (userId: Id, boardId: Id) =>
  getUserRef(userId).child(BOARDS).child(boardId);
