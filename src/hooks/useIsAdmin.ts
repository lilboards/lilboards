import type { Id } from '../types';
import { useSelector } from './useSelector';

/**
 * Is admin hook.
 */
export function useIsAdmin(boardId: Id) {
  return useSelector((state) => {
    if (!boardId) {
      return false;
    }

    const board = state.boards[boardId];

    if (!board) {
      return false;
    }

    if (!board.createdBy || !state.user.id) {
      return false;
    }

    return board.createdBy === state.user.id;
  });
}
