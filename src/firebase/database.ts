/* istanbul ignore file */
import { debounce } from 'debounce';
import {
  child,
  get,
  getDatabase,
  push,
  ref,
  remove,
  runTransaction,
  set,
  update,
} from 'firebase/database';

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
import type { Board, Column, Id, Item, LikesItem } from '../types';
import { firebaseApp } from './app';

const database = getDatabase(firebaseApp);

if (isDevelopment && isLocalhost) {
  const databaseUrl = new URL(
    process.env.REACT_APP_FIREBASE_DATABASE_URL || 'localhost'
  );
  const { connectDatabaseEmulator } = require('firebase/database');
  connectDatabaseEmulator(
    database,
    databaseUrl.hostname,
    Number(databaseUrl.port) || 9000
  );
}

const rootRef = ref(database);

/**
 * Generates database reference key.
 */
export function generateId(): Id {
  const ref = push(rootRef);
  return ref.key!;
}

export const boardsRef = ref(database, BOARDS);

/**
 * Gets board ref.
 *
 * @param boardId - The board id.
 */
export const getBoardRef = (boardId: Id) => child(boardsRef, boardId);

/**
 * Gets board data ref.
 *
 * @param boardId - The board id.
 */
export const getBoardDataRef = (boardId: Id) =>
  child(getBoardRef(boardId), BOARD);

/**
 * Gets board value.
 *
 * @param boardId - The board id.
 */
export const getBoardVal = async (boardId: Id): Promise<Board | null> =>
  (await get(getBoardDataRef(boardId))).val();

/**
 * Removes board.
 *
 * @param boardId - The board id.
 */
export const removeBoard = (boardId: Id) => {
  remove(getBoardRef(boardId));
};

/**
 * Updates board data.
 *
 * @param boardId - The board id.
 */
export const saveBoardData = (boardId: Id, board: Partial<Board>) => {
  update(getBoardDataRef(boardId), board);
};

/**
 * Updates board data with debounce.
 *
 * @param boardId - The board id.
 */
export const debouncedSaveBoardData = debounce(saveBoardData, HALF_SECOND);

/**
 * Gets columns ref.
 *
 * @param boardId - The board id.
 */
export const getColumnsRef = (boardId: Id) =>
  child(getBoardRef(boardId), COLUMNS);

/**
 * Gets column ref.
 *
 * @param boardId - The board id.
 * @param columnId - The column id.
 */
export const getColumnRef = (boardId: Id, columnId: Id) =>
  child(getColumnsRef(boardId), columnId);

/**
 * Removes column.
 *
 * @param boardId - The board id.
 * @param columnId - The column id.
 */
export const removeColumn = (boardId: Id, columnId: Id) => {
  remove(getColumnRef(boardId, columnId));
};

/**
 * Updates column item ids.
 *
 * @param boardId - The board id.
 * @param columnItemIds - The column item ids.
 */
export const saveColumnItemIds = (
  boardId: Id,
  columnItemIds: { [columnId: string]: Id[] }
) => {
  const columnIds = Object.keys(columnItemIds);

  if (columnIds.length === 1) {
    const columnId = columnIds[0];
    const columnItemIdsRef = child(getColumnRef(boardId, columnId), ITEM_IDS);
    set(columnItemIdsRef, columnItemIds[columnId]);
    return;
  }

  const columnsRef = getColumnsRef(boardId);

  /**
   * {@link https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions}
   */
  runTransaction(columnsRef, (columns) => {
    if (columns) {
      Object.entries(columnItemIds).forEach(([columnId, itemIds]) => {
        columns[columnId] = columns[columnId] || {};
        columns[columnId][ITEM_IDS] = itemIds;
      });
      return columns;
    }
  });
};

/**
 * Updates column.
 *
 * @param boardId - The board id.
 * @param columnId - The column id.
 * @param column - The column data.
 */
export const updateColumn = (
  boardId: Id,
  columnId: Id,
  column: Partial<Column>
) => {
  update(getColumnRef(boardId, columnId), column);
};

/**
 * Updates column with debounce.
 *
 * @param boardId - The board id.
 * @param columnId - The column id.
 * @param column - The column data.
 */
export const debouncedUpdateColumn = debounce(updateColumn, HALF_SECOND);

/**
 * Gets items ref.
 *
 * @param boardId - The board id.
 */
export const getItemsRef = (boardId: Id) => child(getBoardRef(boardId), ITEMS);

/**
 * Gets item ref.
 *
 * @param boardId - The board id.
 * @param itemId - The item id.
 */
export const getItemRef = (boardId: Id, itemId: Id) =>
  child(getItemsRef(boardId), itemId);

/**
 * Removes item.
 *
 * @param boardId - The board id.
 * @param itemId - The item id.
 */
export const removeItem = (boardId: Id, itemId: Id) => {
  remove(getItemRef(boardId, itemId));
};

/**
 * Updates item.
 *
 * @param boardId - The board id.
 * @param itemId - The item id.
 * @param item - The item data.
 */
export const updateItem = (boardId: Id, itemId: Id, item: Partial<Item>) => {
  update(getItemRef(boardId, itemId), item);
};

/**
 * Get likes ref.
 *
 * @param boardId - The board id.
 */
export const getLikesRef = (boardId: Id) => child(getBoardRef(boardId), LIKES);

/**
 * Get likes items ref.
 *
 * @param boardId - The board id.
 */
const getLikesItemsRef = (boardId: Id) => child(getLikesRef(boardId), ITEMS);

/**
 * Get likes item ref.
 *
 * @param boardId - The board id.
 * @param itemId - The item id.
 */
const getLikesItemRef = (boardId: Id, itemId: Id) =>
  child(getLikesItemsRef(boardId), itemId);

/**
 * Likes item.
 *
 * @param boardId - The board id.
 * @param itemId - The item id.
 * @param userId - The user id.
 */
export const likeItem = (boardId: Id, itemId: Id, userId: Id) => {
  update(getLikesItemRef(boardId, itemId), { [userId]: true });
};

/**
 * Sets likes item.
 *
 * @param boardId - The board id.
 * @param itemId - The item id.
 * @param likes - The likes data.
 */
export const setLikesItem = (boardId: Id, itemId: Id, likes: LikesItem) => {
  set(getLikesItemRef(boardId, itemId), likes);
};

/**
 * Removes likes item.
 *
 * @param boardId - The board id.
 * @param itemId - The item id.
 */
export const removeLikesItem = (boardId: Id, itemId: Id) => {
  remove(getLikesItemRef(boardId, itemId));
};

/**
 * Unlikes item.
 *
 * @param boardId - The board id.
 * @param itemId - The item id.
 * @param userId - The user id.
 */
export const unlikeItem = (boardId: Id, itemId: Id, userId: Id) => {
  const ref = child(getLikesItemRef(boardId, itemId), userId);
  remove(ref);
};

export const usersRef = ref(database, USERS);

/**
 * Gets user ref.
 *
 * @param userId - The user id.
 */
export const getUserRef = (userId: Id) => child(usersRef, userId);

/**
 * Gets user boards ref.
 *
 * @param userId - The user id.
 */
export const getUserBoardsRef = (userId: Id) =>
  child(getUserRef(userId), BOARDS);

/**
 * Updates user board id.
 *
 * @param userId - The user id.
 * @param boardId - The board id.
 */
export const saveUserBoardId = (userId: Id, boardId: Id) => {
  update(getUserBoardsRef(userId), { [boardId]: true });
};

/**
 * Gets user boards value.
 *
 * @param userId - The user id.
 */
export const getUserBoardsVal = async (
  userId: Id
): Promise<{ [boardId: string]: boolean } | null> =>
  (await get(getUserBoardsRef(userId))).val();

/**
 * Gets user board ref.
 *
 * @param userId - The user id.
 * @param boardId - The board id.
 */
export const getUserBoardRef = (userId: Id, boardId: Id) =>
  child(child(getUserRef(userId), BOARDS), boardId);

/**
 * Removes user board.
 *
 * @param userId - The user id.
 * @param boardId - The board id.
 */
export const removeUserBoard = (userId: Id, boardId: Id) => {
  remove(getUserBoardRef(userId, boardId));
};
