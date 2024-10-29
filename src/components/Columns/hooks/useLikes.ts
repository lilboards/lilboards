import { onValue } from 'firebase/database';
import { useEffect } from 'react';
import { getLikesRef } from 'src/firebase';
import { useDispatch } from 'src/hooks';
import { actions } from 'src/store';
import { Id } from 'src/types';

/**
 * Listens to like changes.
 */
export function useLikes(boardId: Id) {
  const dispatch = useDispatch();

  useEffect(() => {
    const likesRef = getLikesRef(boardId);

    // subscribe on mount
    const unsubscribe = onValue(likesRef, (likesSnapshot) => {
      const likes = likesSnapshot.val();

      setTimeout(() => {
        if (likes) {
          dispatch(actions.loadLikes(likes));
        } else {
          dispatch(actions.resetLikes());
        }
      });
    });

    // unsubscribe and reset on unmount
    return () => {
      unsubscribe();
      dispatch(actions.resetLikes());
    };
  }, [boardId, dispatch]);
}
