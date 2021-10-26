import { useEffect } from 'react';

import actions from '../../../actions';
import { getLikesRef } from '../../../firebase';
import { useDispatch } from '../../../hooks';
import { EventType, Id } from '../../../types';

export function useLikes(boardId: Id) {
  const dispatch = useDispatch();

  useEffect(() => {
    const likesRef = getLikesRef(boardId);

    // subscribe on mount
    likesRef.on(EventType.value, (likesSnapshot) => {
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
    return function unsubscribe() {
      likesRef.off(EventType.value);
      dispatch(actions.resetLikes());
    };
  }, [boardId, dispatch]);
}
