import { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import AddButton from '../AddButton';
import CloseButton from '../CloseButton';

import { getColumnsRef } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import actions from '../../actions';

import type { Id } from '../../types';

type Props = {
  boardId: string;
};

export default function Columns(props: Props) {
  const columns = useSelector((state) =>
    Object.entries(state.columns).map(([id, column]) => ({
      ...column,
      id,
    }))
  );
  const dispatch = useDispatch();

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
    dispatch(actions.addColumn(props.boardId));
  }

  function editColumn(columnId: Id, name: string) {
    dispatch(
      actions.editColumn({
        boardId: props.boardId,
        columnId,
        name,
      })
    );
  }

  function deleteColumn(id: Id) {
    dispatch(
      actions.deleteColumn({
        boardId: props.boardId,
        id,
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
        {columns.map((column, index) => {
          const columnNameIndex = `Column ${index + 1}`;

          return (
            <Grid item key={column.id} xs={12} sm={3}>
              <TextField
                inputProps={{ 'aria-label': 'Column Name' }}
                placeholder={columnNameIndex}
                onChange={(event) => editColumn(column.id, event.target.value)}
                value={column.name}
              />

              <CloseButton
                aria-label={`Delete column "${column.name || columnNameIndex}"`}
                onClick={() => deleteColumn(column.id)}
                size="small"
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
