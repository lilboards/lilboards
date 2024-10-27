import { createSelector } from '@reduxjs/toolkit';
import { RootState, SortBy, SortOrder } from 'src/types';
import { sort } from 'src/utils';

export const selectListIds = createSelector(
  (state: RootState) => state.lists,
  (lists) => {
    const listsWithId = Object.keys(lists).map((id) => ({
      ...lists[id],
      id,
    }));

    return sort(listsWithId, SortBy.createdAt, SortOrder.Descending).map(
      (list) => list.id,
    );
  },
);
