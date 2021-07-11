import { useEffect } from 'react';

import actions from '../../../actions';
import { getItemsRef } from '../../../firebase';
import { useDispatch } from '../../../hooks';

import { EventType, Id, Item } from '../../../types';

export function useItems(boardId: Id) {
  const dispatch = useDispatch();

  useEffect(() => {
    const itemsRef = getItemsRef(boardId);

    // item added
    itemsRef.on(EventType.child_added, (itemSnapshot) => {
      setTimeout(() => {
        dispatch(
          actions.updateItem({
            item: itemSnapshot.val(),
            itemId: itemSnapshot.key as Id,
            skipSave: true,
          })
        );
      });
    });

    // item changed
    itemsRef.on(EventType.child_changed, (itemSnapshot) => {
      setTimeout(() => {
        const item: Item = itemSnapshot.val();
        item.likes = item.likes || {};
        dispatch(
          actions.updateItem({
            item,
            itemId: itemSnapshot.key as Id,
            skipSave: true,
          })
        );
      });
    });

    // item removed
    itemsRef.on(EventType.child_removed, (itemSnapshot) => {
      setTimeout(() => {
        dispatch(
          actions.removeItem({
            itemId: itemSnapshot.key as Id,
            skipSave: true,
          })
        );
      });
    });

    // unsubscribe and reset on unmount
    return () => {
      itemsRef.off(EventType.child_added);
      itemsRef.off(EventType.child_changed);
      itemsRef.off(EventType.child_removed);
      dispatch(actions.resetItems());
    };
  }, [boardId, dispatch]);
}
