import { DatabaseKey } from 'src/constants';
import type { Id } from 'src/types';

import { useSelector } from './useSelector';

/**
 * Is admin hook.
 *
 * @param key - Boards or lists.
 * @param id - Board or list id.
 * @returns - Whether user is the creator of the board or list.
 */
export function useIsAdmin(
  key: DatabaseKey.boards | DatabaseKey.lists,
  id: Id,
): boolean {
  return useSelector((state) => {
    if (!id) {
      return false;
    }

    const data = state[key][id];

    if (!data) {
      return false;
    }

    if (!data.createdBy || !state.user.id) {
      return false;
    }

    return data.createdBy === state.user.id;
  });
}
