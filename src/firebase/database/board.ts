/* istanbul ignore file */

import debounce from 'debounce';
import {
  child,
  get,
  ref,
  remove,
  runTransaction,
  set,
  update,
} from 'firebase/database';
import { DatabaseKey, HALF_SECOND } from 'src/constants';
import type { Board, Column, Id, Item, LikesItem } from 'src/types';

import { database } from './database';

export const boardsRef = ref(database, DatabaseKey.boards);

/**
 * Gets board ref.
 */
export const getBoardRef = (boardId: Id) => child(boardsRef, boardId);

/**
 * Gets board data ref.
 */
export const getBoardDataRef = (boardId: Id) =>
  child(getBoardRef(boardId), DatabaseKey.board);

/**
 * Gets board value.
 */
export const getBoardVal = async (boardId: Id): Promise<Board | null> =>
  (await get(getBoardDataRef(boardId))).val();

/**
 * Removes board.
 */
export const removeBoard = (boardId: Id) => {
  remove(getBoardRef(boardId));
};

/**
 * Updates board data.
 */
export const saveBoardData = (boardId: Id, board: Partial<Board>) => {
  update(getBoardDataRef(boardId), board);
};

/**
 * Updates board data with debounce.
 */
export const debouncedSaveBoardData = debounce(saveBoardData, HALF_SECOND);

/**
 * Gets columns ref.
 */
export const getColumnsRef = (boardId: Id) =>
  child(getBoardRef(boardId), DatabaseKey.columns);

/**
 * Gets column ref.
 */
export const getColumnRef = (boardId: Id, columnId: Id) =>
  child(getColumnsRef(boardId), columnId);

/**
 * Removes column.
 */
export const removeColumn = (boardId: Id, columnId: Id) => {
  remove(getColumnRef(boardId, columnId));
};

/**
 * Updates column item ids.
 */
export const saveColumnItemIds = (
  boardId: Id,
  columnItemIds: { [columnId: string]: Id[] },
) => {
  const columnIds = Object.keys(columnItemIds);

  if (columnIds.length === 1) {
    const columnId = columnIds[0];
    const columnItemIdsRef = child(
      getColumnRef(boardId, columnId),
      DatabaseKey.itemIds,
    );
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
        columns[columnId][DatabaseKey.itemIds] = itemIds;
      });
      return columns;
    }
  });
};

/**
 * Updates column.
 */
export const updateColumn = (
  boardId: Id,
  columnId: Id,
  column: Partial<Column>,
) => {
  update(getColumnRef(boardId, columnId), column);
};

/**
 * Updates column with debounce.
 */
export const debouncedUpdateColumn = debounce(updateColumn, HALF_SECOND);

/**
 * Gets items ref.
 */
export const getItemsRef = (boardId: Id) =>
  child(getBoardRef(boardId), DatabaseKey.items);

/**
 * Gets item ref.
 */
export const getItemRef = (boardId: Id, itemId: Id) =>
  child(getItemsRef(boardId), itemId);

/**
 * Removes item.
 */
export const removeItem = (boardId: Id, itemId: Id) => {
  remove(getItemRef(boardId, itemId));
};

/**
 * Updates item.
 */
export const updateItem = (boardId: Id, itemId: Id, item: Partial<Item>) => {
  update(getItemRef(boardId, itemId), item);
};

/**
 * Get likes ref.
 */
export const getLikesRef = (boardId: Id) =>
  child(getBoardRef(boardId), DatabaseKey.likes);

/**
 * Get likes items ref.
 */
const getLikesItemsRef = (boardId: Id) =>
  child(getLikesRef(boardId), DatabaseKey.items);

/**
 * Get likes item ref.
 */
const getLikesItemRef = (boardId: Id, itemId: Id) =>
  child(getLikesItemsRef(boardId), itemId);

/**
 * Likes item.
 */
export const likeItem = (boardId: Id, itemId: Id, userId: Id) => {
  update(getLikesItemRef(boardId, itemId), { [userId]: true });
};

/**
 * Sets likes item.
 */
export const setLikesItem = (boardId: Id, itemId: Id, likes: LikesItem) => {
  set(getLikesItemRef(boardId, itemId), likes);
};

/**
 * Removes likes item.
 */
export const removeLikesItem = (boardId: Id, itemId: Id) => {
  remove(getLikesItemRef(boardId, itemId));
};

/**
 * Unlikes item.
 */
export const unlikeItem = (boardId: Id, itemId: Id, userId: Id) => {
  const ref = child(getLikesItemRef(boardId, itemId), userId);
  remove(ref);
};
