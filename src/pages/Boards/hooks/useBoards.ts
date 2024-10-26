import { useEffect } from 'react';
import { getBoardVal, getUserBoardsVal } from 'src/firebase';
import { useDispatch } from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

export function useBoards(
  dispatch: ReturnType<typeof useDispatch>,
  userId: Id,
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
        }),
      );

      boards.forEach((board) => board && dispatch(actions.loadBoard(board)));
    })();
  }, [dispatch, userId]);
}
