import type { Id } from '../types';
import { useSelector } from '.';

export const DEFAULT_MAX_LIKES = 5;

/**
 * Max likes hook.
 *
 * @param boardId - Board id.
 */
export function useMaxLikes(boardId: Id): number {
  const maxLikes = useSelector(
    (state) => (state.boards[boardId] || {}).maxLikes
  );
  return maxLikes ?? DEFAULT_MAX_LIKES;
}
