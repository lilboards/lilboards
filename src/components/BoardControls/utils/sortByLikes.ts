import type { ColumnItemIds, Columns, Likes } from 'src/types';
import { cloneArray, countObject } from 'src/utils';

export function sortByLikes(columns: Columns, likes: Likes): ColumnItemIds {
  const columnItemIds: ColumnItemIds = {};

  for (const columnId in columns) {
    const { itemIds } = columns[columnId];

    columnItemIds[columnId] = cloneArray(itemIds).sort((itemId1, itemId2) => {
      const likes1 = countObject(likes.items[itemId1]);
      const likes2 = countObject(likes.items[itemId2]);
      return likes2 - likes1;
    });
  }

  return columnItemIds;
}
