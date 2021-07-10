import { useEffect } from 'react';

import actions from '../../../actions';
import { getItemsRef } from '../../../firebase';
import { useDispatch } from '../../../hooks';

import type { Id } from '../../../types';

export function useItems(boardId: Id) {
  const dispatch = useDispatch();

  useEffect(() => {
    // subscribe on mount
    const itemsRef = getItemsRef(boardId);

    itemsRef.on('value', (itemsSnapshot) => {
      const items = itemsSnapshot.val();
      /* istanbul ignore next */
      if (items) {
        setTimeout(() => {
          dispatch(actions.loadItems(items));
        });
      }
    });

    // unsubscribe and reset on unmount
    return function unsubscribe() {
      itemsRef.off('value');
      dispatch(actions.resetItems());
    };
  }, [boardId, dispatch]);
}
