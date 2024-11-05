import { createSelector } from '@reduxjs/toolkit';
import type { Id, RootState } from 'src/types';

import { useSelector } from './useSelector';

const selectBoard = createSelector(
  [
    (state: RootState) => state.boards,
    (state: RootState, boardId: Id) => boardId,
  ],
  (boards, boardId) => boards[boardId],
);

/**
 * Get board by id.
 */
export function useGetBoard(boardId: Id) {
  return useSelector((state) => selectBoard(state, boardId));
}
