import { createSelector } from '@reduxjs/toolkit';

import type { Id, RootState } from '../types';
import { useSelector } from '.';

export const DEFAULT_MAX_LIKES = 5;

const selectMaxLikes = createSelector(
  [
    (state: RootState) => state.boards,
    (state: RootState, boardId: Id) => boardId,
  ],
  (boards, boardId) => (boards[boardId] || {}).maxLikes,
);

/**
 * Get board max likes.
 *
 * @param boardId - Board id.
 * @returns - Board max likes.
 */
export function useMaxLikes(boardId: Id): number {
  const maxLikes = useSelector((state) => selectMaxLikes(state, boardId));
  return maxLikes ?? DEFAULT_MAX_LIKES;
}
