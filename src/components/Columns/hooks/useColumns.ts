import { useEffect } from 'react';

import actions from '../../../actions';
import { getColumnsRef } from '../../../firebase';
import { useDispatch } from '../../../hooks';

import { Column, EventType, Id } from '../../../types';

export function useColumns(boardId: Id) {
  const dispatch = useDispatch();

  useEffect(() => {
    const columnsRef = getColumnsRef(boardId);

    // column added
    columnsRef.on(EventType.child_added, (columnSnapshot) => {
      setTimeout(() => {
        dispatch(
          actions.updateColumn({
            boardId,
            column: columnSnapshot.val(),
            columnId: columnSnapshot.key as Id,
            skipSave: true,
          })
        );
      });
    });

    // column changed
    columnsRef.on(EventType.child_changed, (columnSnapshot) => {
      setTimeout(() => {
        const column: Column = columnSnapshot.val();
        dispatch(
          actions.updateColumn({
            boardId,
            column,
            columnId: columnSnapshot.key as Id,
            skipSave: true,
          })
        );
      });
    });

    // column removed
    columnsRef.on(EventType.child_removed, (columnSnapshot) => {
      setTimeout(() => {
        dispatch(
          actions.deleteColumn({
            boardId,
            columnId: columnSnapshot.key as Id,
            skipSave: true,
          })
        );
      });
    });

    // unsubscribe and reset on unmount
    return () => {
      columnsRef.off(EventType.child_added);
      columnsRef.off(EventType.child_changed);
      columnsRef.off(EventType.child_removed);
      dispatch(actions.resetColumns());
    };
  }, [boardId, dispatch]);
}
