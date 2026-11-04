/* istanbul ignore file */

import { child, get, ref, remove, update } from 'firebase/database';
import { DatabaseKey } from 'src/constants';
import type { Id } from 'src/types';

import { database } from './database';

export const usersRef = ref(database, DatabaseKey.users);

/**
 * Gets user ref.
 */
export const getUserRef = (userId: Id) => child(usersRef, userId);

/**
 * Gets user boards ref.
 */
export const getUserBoardsRef = (userId: Id) =>
  child(getUserRef(userId), DatabaseKey.boards);

/**
 * Updates user board id.
 */
export const saveUserBoardId = (userId: Id, boardId: Id) => {
  void update(getUserBoardsRef(userId), { [boardId]: true });
};

/**
 * Gets user boards value.
 */
export const getUserBoardsVal = async (
  userId: Id,
): Promise<Record<string, boolean> | null> =>
  (await get(getUserBoardsRef(userId))).val() as Record<string, boolean> | null;

/**
 * Gets user board ref.
 */
export const getUserBoardRef = (userId: Id, boardId: Id) =>
  child(child(getUserRef(userId), DatabaseKey.boards), boardId);

/**
 * Removes user board.
 */
export const removeUserBoard = (userId: Id, boardId: Id) => {
  void remove(getUserBoardRef(userId, boardId));
};

/**
 * Gets user lists ref.
 */
export const getUserListsRef = (userId: Id) =>
  child(getUserRef(userId), DatabaseKey.lists);

/**
 * Updates user list id.
 */
export const saveUserListId = (userId: Id, listId: Id) => {
  void update(getUserListsRef(userId), { [listId]: true });
};

/**
 * Gets user lists value.
 */
export const getUserListsVal = async (
  userId: Id,
): Promise<Record<string, boolean> | null> =>
  (await get(getUserListsRef(userId))).val() as Record<string, boolean> | null;

/**
 * Gets user list ref.
 */
export const getUserListRef = (userId: Id, listId: Id) =>
  child(child(getUserRef(userId), DatabaseKey.lists), listId);

/**
 * Removes user list.
 */
export const removeUserList = (userId: Id, listId: Id) => {
  void remove(getUserListRef(userId, listId));
};
