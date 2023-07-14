import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';

import { getBoardDataRef } from '../../../firebase';
import { useDispatch, useSelector } from '../../../hooks';
import { actions } from '../../../store';
import { Id } from '../../../types';

export function useBoard(boardId: Id) {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards[boardId]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!boardId) {
      return;
    }

    // subscribe to board value
    const unsubscribeOnValue = onValue(
      getBoardDataRef(boardId),
      (boardSnapshot) => {
        const board = boardSnapshot.val();

        if (board) {
          // prevent race condition with redux reducer
          setTimeout(() => {
            dispatch(
              actions.loadBoard({
                board,
                boardId,
              }),
            );
            setIsLoaded(true);
          });
        } else {
          // board removed
          dispatch(
            actions.deleteBoard({
              boardId,
              skipSave: true,
              userId: '',
            }),
          );
          setIsLoaded(true);
        }
      },
    );

    // unsubscribe on unmount
    return () => {
      unsubscribeOnValue();
      setIsLoaded(false);
    };
  }, [boardId, dispatch, setIsLoaded]);

  return {
    board,
    isLoaded,
  };
}
