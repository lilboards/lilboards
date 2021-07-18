import { useEffect, useState } from 'react';

import actions from '../../../actions';
import { getBoardVal } from '../../../firebase';
import { useDispatch, useSelector } from '../../../hooks';

import type { Id } from '../../../types';

export function useBoard(boardId?: Id) {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards[boardId || '']);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!boardId || board) {
      return;
    }

    getBoardVal(boardId).then((board) => {
      if (board) {
        dispatch(
          actions.loadBoard({
            ...board,
            id: boardId,
          })
        );
      }
      setIsLoaded(true);
    });

    return () => setIsLoaded(false);
  }, [boardId, setIsLoaded, board, dispatch]);

  return {
    board,
    isLoaded,
  };
}
