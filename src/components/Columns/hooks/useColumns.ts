import { useEffect } from 'react';

import actions from '../../../actions';
import { getColumnsRef } from '../../../firebase';
import { useDispatch } from '../../../hooks';

import type { Id } from '../../../types';

export function useColumns(
  boardId: Id,
  dispatch: ReturnType<typeof useDispatch>
) {
  useEffect(() => {
    // subscribe on mount
    const columnsRef = getColumnsRef(boardId);

    columnsRef.on('value', (columnsSnapshot) => {
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
      columnsRef.off('value');
      dispatch(actions.resetColumns());
    };
  }, [boardId, dispatch]);
}
