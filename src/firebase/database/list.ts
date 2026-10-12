/* istanbul ignore file */

import debounce from 'debounce';
import { child, get, ref, remove, set, update } from 'firebase/database';
import { DatabaseKey, HALF_SECOND } from 'src/constants';
import type { Id, Item, List, Row } from 'src/types';

import { database } from './database';

export const listsRef = ref(database, DatabaseKey.lists);

/**
 * Gets list ref.
 */
export const getListRef = (listId: Id) => child(listsRef, listId);

/**
 * Gets list data ref.
 */
export const getListDataRef = (listId: Id) =>
  child(getListRef(listId), DatabaseKey.list);

/**
 * Gets list value.
 */
export const getListVal = async (listId: Id): Promise<List | null> =>
  (await get(getListDataRef(listId))).val();

/**
 * Removes list.
 */
export const removeList = (listId: Id) => {
  remove(getListRef(listId));
};

/**
 * Updates list data.
 */
export const saveListData = (listId: Id, list: Partial<List>) => {
  update(getListDataRef(listId), list);
};

/**
 * Updates list data with debounce.
 */
export const debouncedSaveListData = debounce(saveListData, HALF_SECOND);

/**
 * Gets rows ref.
 */
export const getRowsRef = (listId: Id) =>
  child(getListRef(listId), DatabaseKey.rows);

/**
 * Gets row ref.
 */
export const getRowRef = (listId: Id, rowId: Id) =>
  child(getRowsRef(listId), rowId);

/**
 * Removes row.
 */
export const removeRow = (listId: Id, rowId: Id) => {
  remove(getRowRef(listId, rowId));
};

/**
 * Updates row item ids.
 *
 * Writes are made to each row's `itemIds` path so that security rules can
 * let collaborators reorder items without granting write access to rows.
 */
export const saveRowItemIds = (
  listId: Id,
  rowItemIds: { [rowId: string]: Id[] },
) => {
  Object.entries(rowItemIds).forEach(([rowId, itemIds]) => {
    const rowItemIdsRef = child(getRowRef(listId, rowId), DatabaseKey.itemIds);
    set(rowItemIdsRef, itemIds);
  });
};

/**
 * Updates row.
 */
export const updateRow = (listId: Id, rowId: Id, row: Partial<Row>) => {
  update(getRowRef(listId, rowId), row);
};

/**
 * Updates row with debounce.
 */
export const debouncedUpdateRow = debounce(updateRow, HALF_SECOND);

/**
 * Gets list items ref.
 */
export const getListItemsRef = (listId: Id) =>
  child(getListRef(listId), DatabaseKey.items);

/**
 * Gets list item ref.
 */
export const getListItemRef = (listId: Id, itemId: Id) =>
  child(getListItemsRef(listId), itemId);

/**
 * Removes list item.
 */
export const removeListItem = (listId: Id, itemId: Id) => {
  remove(getListItemRef(listId, itemId));
};

/**
 * Updates list item.
 */
export const updateListItem = (listId: Id, itemId: Id, item: Partial<Item>) => {
  update(getListItemRef(listId, itemId), item);
};
