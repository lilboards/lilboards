import { onValue } from 'firebase/database';
import { useEffect } from 'react';

import actions from '../../../actions';
import { getLikesRef } from '../../../firebase';
import { useDispatch } from '../../../hooks';
import { Id } from '../../../types';

/**
 * Listens to like changes.
 *
 * @param boardId - Board id.
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
