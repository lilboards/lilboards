import { useEffect } from 'react';
import { getBoardVal, getUserBoardsVal } from 'src/firebase';
import { useDispatch, useGetUserId } from 'src/hooks';
import { actions } from 'src/store';

export function useBoards() {
  const dispatch = useDispatch();
  const userId = useGetUserId();

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
