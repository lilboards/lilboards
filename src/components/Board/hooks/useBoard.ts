import { useEffect, useState } from 'react';

import actions from '../../../actions';
import { getBoardDataRef } from '../../../firebase';
import { useDispatch, useSelector } from '../../../hooks';
import { EventType, Id } from '../../../types';

export function useBoard(boardId: Id) {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards[boardId]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!boardId) {
      return;
    }

    const boardRef = getBoardDataRef(boardId);

    // subscribe to board value
    boardRef.on(EventType.value, (boardSnapshot) => {
      const board = boardSnapshot.val();
      if (board) {
        // prevent race condition with redux reducer
        setTimeout(() => {
          dispatch(
            actions.loadBoard({
              board,
              boardId,
            })
          );
          setIsLoaded(true);
        });
      } else {
        setIsLoaded(true);
      }
    });

    // unsubscribe on unmount
    return () => {
      boardRef.off(EventType.value);
      setIsLoaded(false);
    };
  }, [boardId, dispatch, setIsLoaded]);

  return {
    board,
    isLoaded,
  };
}
