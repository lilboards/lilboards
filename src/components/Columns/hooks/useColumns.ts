import type { Unsubscribe } from 'firebase/database';
import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from 'firebase/database';
import { useEffect } from 'react';
import { getColumnsRef } from 'src/firebase';
import { useDispatch } from 'src/hooks';
import { actions } from 'src/store';
import { Id } from 'src/types';

/**
 * Listens to column changes.
 */
export function useColumns(boardId: Id) {
  const dispatch = useDispatch();

  useEffect(() => {
    const columnsRef = getColumnsRef(boardId);
    const unsubscribes: Unsubscribe[] = [];

    // column added
    unsubscribes.push(
      onChildAdded(columnsRef, (columnSnapshot) => {
        const columnId = columnSnapshot.key;

        if (!columnId) {
          return;
        }

        setTimeout(() => {
          dispatch(
            actions.updateColumn({
              boardId,
              column: columnSnapshot.val(),
              columnId,
              skipSave: true,
            }),
          );
        });
      }),
    );

    // column changed
    unsubscribes.push(
      onChildChanged(columnsRef, (columnSnapshot) => {
        const columnId = columnSnapshot.key;

        if (!columnId) {
          return;
        }

        setTimeout(() => {
          dispatch(
            actions.updateColumn({
              boardId,
              column: columnSnapshot.val(),
              columnId: columnSnapshot.key as Id,
              skipSave: true,
            }),
          );
        });
      }),
    );

    // column removed
    unsubscribes.push(
      onChildRemoved(columnsRef, (columnSnapshot) => {
        const columnId = columnSnapshot.key;

        if (!columnId) {
          return;
        }

        setTimeout(() => {
          dispatch(
            actions.removeColumn({
              boardId,
              columnId,
              skipSave: true,
            }),
          );
        });
      }),
    );

    // unsubscribe and reset on unmount
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
      dispatch(actions.resetColumns());
    };
  }, [boardId, dispatch]);
}
