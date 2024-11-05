import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseKey } from 'src/constants';
import { getBoardDataRef } from 'src/firebase';
import { useDispatch, useGetBoardOrList } from 'src/hooks';
import { actions } from 'src/store';
import { Id } from 'src/types';

export function useBoard(boardId: Id) {
  const dispatch = useDispatch();
  const board = useGetBoardOrList(DatabaseKey.boards, boardId);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (boardId && !board && isLoaded) {
      navigate('/404');
    }
  }, [boardId, board, isLoaded, navigate]);

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

  return board;
}
