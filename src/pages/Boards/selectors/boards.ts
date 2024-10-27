import { createSelector } from '@reduxjs/toolkit';
import { RootState, SortBy, SortOrder } from 'src/types';
import { sort } from 'src/utils';

export const selectBoardIds = createSelector(
  (state: RootState) => state.boards,
  (boards) => {
    const boardsWithId = Object.keys(boards).map((id) => ({
      ...boards[id],
      id,
    }));
    return sort(boardsWithId, SortBy.createdAt, SortOrder.Descending).map(
      (board) => board.id,
    );
  },
);
