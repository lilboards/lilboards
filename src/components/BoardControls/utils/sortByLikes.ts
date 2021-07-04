import { cloneArray, countObject } from '../../../utils';

import type { ColumnItemIds, Columns, Items } from '../../../types';

export function sortByLikes(columns: Columns, items: Items): ColumnItemIds {
  const columnItemIds: ColumnItemIds = {};

  for (const columnId in columns) {
    const { itemIds } = columns[columnId];

    columnItemIds[columnId] = cloneArray(itemIds).sort((itemId1, itemId2) => {
      const likes1 = countObject(items[itemId1].likes);
      const likes2 = countObject(items[itemId2].likes);
      return likes2 - likes1;
    });
  }

  return columnItemIds;
}
