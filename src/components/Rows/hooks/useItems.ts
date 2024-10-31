import type { Unsubscribe } from 'firebase/database';
import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from 'firebase/database';
import { useEffect } from 'react';
import { getListItemsRef } from 'src/firebase';
import { useDispatch } from 'src/hooks';
import { actions } from 'src/store';
import { Id } from 'src/types';

/**
 * Listens to list item changes.
 */
export function useItems(listId: Id) {
  const dispatch = useDispatch();

  useEffect(() => {
    const listItemsRef = getListItemsRef(listId);
    const unsubscribes: Unsubscribe[] = [];

    // list item added
    unsubscribes.push(
      onChildAdded(listItemsRef, (itemSnapshot) => {
        const itemId = itemSnapshot.key;

        if (!itemId) {
          return;
        }

        setTimeout(() => {
          dispatch(
            actions.updateListItem({
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
      onChildChanged(listItemsRef, (itemSnapshot) => {
        const itemId = itemSnapshot.key;

        if (!itemId) {
          return;
        }

        setTimeout(() => {
          dispatch(
            actions.updateListItem({
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
      onChildRemoved(listItemsRef, (itemSnapshot) => {
        const itemId = itemSnapshot.key;

        if (!itemId) {
          return;
        }

        setTimeout(() => {
          dispatch(
            actions.removeListItem({
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
      dispatch(actions.resetListItems());
    };
  }, [listId, dispatch]);
}
