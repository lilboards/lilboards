import { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import AddButton from '../AddButton';
import Column from '../Column';

import actions from '../../actions';
import { generateId, getColumnsRef } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
};

export default function Columns(props: Props) {
  const dispatch = useDispatch();
  const columnIds = useSelector((state) => Object.keys(state.columns));

  useEffect(() => {
    if (!props.boardId) {
      return;
    }

    // subscribe on mount
    const columnsRef = getColumnsRef(props.boardId);
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
  }, [props.boardId, dispatch]);

  if (!props.boardId) {
    return null;
  }

  function addColumn() {
    const columnId = generateId();
    dispatch(
      actions.addColumn({
        boardId: props.boardId,
        columnId,
      })
    );
  }

  return (
    <>
      <Box marginBottom={4}>
        <AddButton onClick={addColumn} size="medium" variant="extended">
          Add column
        </AddButton>
      </Box>

      <Grid container spacing={2} wrap="nowrap">
        {columnIds.map((columnId, index) => (
          <Column
            boardId={props.boardId}
            columnId={columnId}
            index={index}
            key={columnId}
          />
        ))}
      </Grid>
    </>
  );
}
