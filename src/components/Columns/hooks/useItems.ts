import type { Unsubscribe } from 'firebase/database';
import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from 'firebase/database';
import { useEffect } from 'react';
import { getItemsRef } from 'src/firebase';
import { useDispatch } from 'src/hooks';
import { actions } from 'src/store';
import { Id } from 'src/types';

/**
 * Listens to item changes.
 */
export function useItems(boardId: Id) {
  const dispatch = useDispatch();

  useEffect(() => {
    const itemsRef = getItemsRef(boardId);
    const unsubscribes: Unsubscribe[] = [];

    // item added
    unsubscribes.push(
      onChildAdded(itemsRef, (itemSnapshot) => {
        const itemId = itemSnapshot.key;

        if (!itemId) {
          return;
        }

        setTimeout(() => {
          dispatch(
            actions.updateItem({
              item: itemSnapshot.val(),
              itemId,
              skipSave: true,
            }),
          );
        });
      }),
    );

    // item changed
    unsubscribes.push(
      onChildChanged(itemsRef, (itemSnapshot) => {
        const itemId = itemSnapshot.key;

        if (!itemId) {
          return;
        }

        setTimeout(() => {
          dispatch(
            actions.updateItem({
              item: itemSnapshot.val(),
              itemId,
              skipSave: true,
            }),
          );
        });
      }),
    );

    // item removed
    unsubscribes.push(
      onChildRemoved(itemsRef, (itemSnapshot) => {
        const itemId = itemSnapshot.key;

        if (!itemId) {
          return;
        }

        setTimeout(() => {
          dispatch(
            actions.removeItem({
              itemId,
              skipSave: true,
            }),
          );
        });
      }),
    );

    // unsubscribe and reset on unmount
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
      dispatch(actions.resetItems());
    };
  }, [boardId, dispatch]);
}
