import { useEffect } from 'react';

import actions from '../../../actions';
import { getLikesRef } from '../../../firebase';
import { useDispatch } from '../../../hooks';

import { EventType, Id } from '../../../types';

export function useLikes(boardId: Id) {
  const dispatch = useDispatch();

  useEffect(() => {
    // subscribe on mount
    const likesRef = getLikesRef(boardId);

    likesRef.on(EventType.value, (likesSnapshot) => {
      const likes = likesSnapshot.val();
      /* istanbul ignore next */
      if (likes) {
        setTimeout(() => {
          dispatch(actions.loadLikes(likes));
        });
      }
    });

    // unsubscribe and reset on unmount
    return function unsubscribe() {
      likesRef.off(EventType.value);
      dispatch(actions.resetLikes());
    };
  }, [boardId, dispatch]);
}
