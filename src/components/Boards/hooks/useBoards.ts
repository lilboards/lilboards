import { useEffect } from 'react';

import actions from '../../../actions';
import { getBoardVal, getUserBoardsVal } from '../../../firebase';
import { useDispatch } from '../../../hooks';

import type { Id } from '../../../types';

export function useBoards(
  dispatch: ReturnType<typeof useDispatch>,
  userId: Id
) {
  useEffect(() => {
    (async () => {
      const userBoards = await getUserBoardsVal(userId);
      if (!userBoards) {
        return;
      }

      const boardIds = Object.keys(userBoards);
      const boards = await Promise.all(
        boardIds.map(async (boardId) => {
          const board = await getBoardVal(boardId);
          if (board) {
            return {
              board,
              boardId,
            };
          }
        })
      );

      boards.forEach((board) => board && dispatch(actions.loadBoard(board)));
    })();
  }, [dispatch, userId]);
}
