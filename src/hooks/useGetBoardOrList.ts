import { createSelector } from '@reduxjs/toolkit';
import { DatabaseKey } from 'src/constants';
import type { Id, RootState } from 'src/types';

import { useSelector } from './useSelector';

const selectBoard = createSelector(
  [
    (state: RootState) => state.boards,
    (state: RootState, boardId: Id) => boardId,
  ],
  (boards, boardId) => boards[boardId],
);

const selectList = createSelector(
  [(state: RootState) => state.lists, (state: RootState, listId: Id) => listId],
  (lists, listId) => lists[listId],
);

/**
 * Get board or list by id.
 *
 * @param key - Boards or lists.
 * @param id - Board or list id.
 * @returns - Board or list.
 */
export function useGetBoardOrList(
  key: DatabaseKey.boards | DatabaseKey.lists,
  id: Id,
) {
  return useSelector((state) => {
    switch (key) {
      case DatabaseKey.boards:
        return selectBoard(state, id);

      case DatabaseKey.lists:
        return selectList(state, id);
    }
  });
}
