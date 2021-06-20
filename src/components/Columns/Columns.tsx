import { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
        <AddButton
          aria-label="Add column"
          onClick={addColumn}
          size="medium"
          variant="extended"
        >
          Add column
        </AddButton>
      </Box>

      <Grid container spacing={2} wrap="nowrap">
        {columns.map((column, index) => {
          const columnName = column.name || `Column ${index + 1}`;
          return (
            <Grid item key={column.id} xs={12} sm={3}>
              <Typography
                color="primary"
                component="h2"
                gutterBottom
                variant="h5"
              >
                {columnName}
                <CloseButton
                  aria-label={`Delete column "${columnName}"`}
                  onClick={() => deleteColumn(column.id)}
                />
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
