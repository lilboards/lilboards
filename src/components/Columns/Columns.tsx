import { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import AddButton from '../AddButton';
import CloseButton from '../CloseButton';
import Items from '../Items';

import { getColumnsRef } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import actions from '../../actions';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
};

export default function Columns(props: Props) {
  const { boardId } = props;
  const columns = useSelector((state) =>
    Object.entries(state.columns).map(([id, column]) => ({
      ...column,
      id,
    }))
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!boardId) {
      return;
    }

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

  if (!boardId) {
    return null;
  }

  function addColumn() {
    dispatch(actions.addColumn(boardId));
  }

  function editColumn(columnId: Id, name: string) {
    dispatch(
      actions.editColumn({
        boardId,
        columnId,
        name,
      })
    );
  }

  function deleteColumn(columnId: Id) {
    dispatch(
      actions.deleteColumn({
        boardId,
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
        {columns.map((column, index) => {
          const columnId = column.id;
          const columnName = column.name;
          const columnNameIndex = `Column ${index + 1}`;

          return (
            <Grid item key={columnId} xs={12} sm={3}>
              <Box marginBottom={2} position="relative">
                <TextField
                  fullWidth
                  inputProps={{ 'aria-label': 'Column Name' }}
                  placeholder={columnNameIndex}
                  onChange={(event) => editColumn(columnId, event.target.value)}
                  value={columnName}
                />

                <Box position="absolute" right={0} top={0}>
                  <CloseButton
                    aria-label={`Delete column "${
                      columnName || columnNameIndex
                    }"`}
                    onClick={() => deleteColumn(columnId)}
                    size="small"
                  />
                </Box>
              </Box>

              <Items boardId={boardId} columnId={columnId} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
