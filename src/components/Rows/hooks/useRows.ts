import type { Unsubscribe } from 'firebase/database';
import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from 'firebase/database';
import { useEffect } from 'react';
import { getRowsRef } from 'src/firebase';
import { useDispatch } from 'src/hooks';
import { actions } from 'src/store';
import { Id } from 'src/types';

/**
 * Listens to row changes.
 */
export function useRows(listId: Id) {
  const dispatch = useDispatch();

  useEffect(() => {
    const rowsRef = getRowsRef(listId);
    const unsubscribes: Unsubscribe[] = [];

    // row added
    unsubscribes.push(
      onChildAdded(rowsRef, (rowSnapshot) => {
        const rowId = rowSnapshot.key;

        if (!rowId) {
          return;
        }

        setTimeout(() => {
          dispatch(
            actions.updateRow({
              listId,
              row: rowSnapshot.val(),
              rowId,
              skipSave: true,
            }),
          );
        });
      }),
    );

    // row changed
    unsubscribes.push(
      onChildChanged(rowsRef, (rowSnapshot) => {
        const rowId = rowSnapshot.key;

        if (!rowId) {
          return;
        }

        setTimeout(() => {
          dispatch(
            actions.updateRow({
              listId,
              row: rowSnapshot.val(),
              rowId: rowSnapshot.key as Id,
              skipSave: true,
            }),
          );
        });
      }),
    );

    // row removed
    unsubscribes.push(
      onChildRemoved(rowsRef, (rowSnapshot) => {
        const rowId = rowSnapshot.key;

        if (!rowId) {
          return;
        }

        setTimeout(() => {
          dispatch(
            actions.removeRow({
              listId,
              rowId,
              skipSave: true,
            }),
          );
        });
      }),
    );

    // unsubscribe and reset on unmount
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
      dispatch(actions.resetRows());
    };
  }, [listId, dispatch]);
}
