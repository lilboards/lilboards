import { useEffect } from 'react';

import actions from '../../../actions';
import { getColumnsRef } from '../../../firebase';
import { useDispatch } from '../../../hooks';

import { EventType, Id } from '../../../types';

export function useColumns(boardId: Id) {
  const dispatch = useDispatch();

  useEffect(() => {
    // subscribe on mount
    const columnsRef = getColumnsRef(boardId);

    columnsRef.on(EventType.value, (columnsSnapshot) => {
      const columns = columnsSnapshot.val();
      /* istanbul ignore next */
      if (columns) {
        setTimeout(() => {
          dispatch(actions.loadColumns(columns));
        });
      }
    });

    // unsubscribe and reset on unmount
    return function unsubscribe() {
      columnsRef.off(EventType.value);
      dispatch(actions.resetColumns());
    };
  }, [boardId, dispatch]);
}
