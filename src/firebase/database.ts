/* istanbul ignore file */
import 'firebase/database';
import { debounce } from 'debounce';

import { firebaseApp } from './app';
import { isDevelopment, isLocalhost } from '../config';
import {
  BOARD,
  BOARDS,
  COLUMNS,
  HALF_SECOND,
  ITEM_IDS,
  ITEMS,
  LIKES,
  USERS,
} from '../constants';

import type { Board, Column, Id, Item, LikeItem } from '../types';

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

export const removeBoard = (boardId: Id) => {
  getBoardRef(boardId).remove();
};

export const saveBoardData = (boardId: Id, board: Partial<Board>) => {
  getBoardDataRef(boardId).update(board);
};

export const debouncedSaveBoardData = debounce(saveBoardData, HALF_SECOND);

/**
 * Columns.
 */
export const getColumnsRef = (boardId: Id) =>
  getBoardRef(boardId).child(COLUMNS);

export const getColumnRef = (boardId: Id, columnId: Id) =>
  getColumnsRef(boardId).child(columnId);

export const removeColumn = (boardId: Id, columnId: Id) => {
  getColumnRef(boardId, columnId).remove();
};

export const saveColumnItemIds = (
  boardId: Id,
  columnItemIds: { [columnId: string]: Id[] }
) => {
  const columnIds = Object.keys(columnItemIds);

  if (columnIds.length === 1) {
    const columnId = columnIds[0];
    getColumnRef(boardId, columnId)
      .child(ITEM_IDS)
      .set(columnItemIds[columnId]);
    return;
  }

  // https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions
  getColumnsRef(boardId).transaction((columns) => {
    if (columns) {
      Object.entries(columnItemIds).forEach(([columnId, itemIds]) => {
        columns[columnId] = columns[columnId] || {};
        columns[columnId][ITEM_IDS] = itemIds;
      });
      return columns;
    }
  });
};

export const updateColumn = (
  boardId: Id,
  columnId: Id,
  column: Partial<Column>
) => {
  getColumnRef(boardId, columnId).update(column);
};

export const debouncedUpdateColumn = debounce(updateColumn, HALF_SECOND);

/**
 * Items.
 */
export const getItemsRef = (boardId: Id) => getBoardRef(boardId).child(ITEMS);

export const getItemRef = (boardId: Id, itemId: Id) =>
  getItemsRef(boardId).child(itemId);

export const removeItem = (boardId: Id, itemId: Id) => {
  getItemRef(boardId, itemId).remove();
};

export const updateItem = (boardId: Id, itemId: Id, item: Partial<Item>) => {
  getItemRef(boardId, itemId).update(item);
};

/**
 * Likes.
 */
export const getLikesRef = (boardId: Id) => getBoardRef(boardId).child(LIKES);

const getLikesItemsRef = (boardId: Id) => getLikesRef(boardId).child(ITEMS);

export const likeItem = (boardId: Id, itemId: Id, userId: Id) => {
  getLikesItemsRef(boardId)
    .child(itemId)
    .update({ [userId]: true });
};

export const setLikesItem = (boardId: Id, itemId: Id, likeItem: LikeItem) => {
  getLikesItemsRef(boardId).child(itemId).set(likeItem);
};

export const removeLikesItem = (boardId: Id, itemId: Id) => {
  getLikesItemsRef(boardId).child(itemId).remove();
};

export const unlikeItem = (boardId: Id, itemId: Id, userId: Id) => {
  getLikesItemsRef(boardId).child(itemId).child(userId).remove();
};

/**
 * Users.
 */
export const usersRef = firebaseDatabase.ref(USERS);

export const getUserRef = (userId: Id) => usersRef.child(userId);

export const getUserBoardsRef = (userId: Id) =>
  getUserRef(userId).child(BOARDS);

export const saveUserBoardId = (userId: Id, boardId: Id) =>
  getUserBoardsRef(userId).update({ [boardId]: true });

export const getUserBoardsVal = async (
  userId: Id
): Promise<{ [boardId: string]: boolean } | null> =>
  (await getUserBoardsRef(userId).get()).val();

export const getUserBoardRef = (userId: Id, boardId: Id) =>
  getUserRef(userId).child(BOARDS).child(boardId);

export const removeUserBoard = (userId: Id, boardId: Id) => {
  getUserBoardRef(userId, boardId).remove();
};
