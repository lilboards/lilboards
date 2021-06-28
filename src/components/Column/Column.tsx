import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import CloseButton from '../CloseButton';
import Items from '../Items';

import actions from '../../actions';
import { debouncedUpdateColumn } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';

import type { ChangeEvent } from 'react';
import type { Id } from '../../types';

type Props = {
  boardId: Id;
  columnId: Id;
  index: number;
};

export default function Column(props: Props) {
  const dispatch = useDispatch();
  const column = useSelector((state) => state.columns[props.columnId]);
  const userEditingColumnId = useSelector(
    (state) => state.user.editing.columnId
  );

  if (!column) {
    return null;
  }

  const columnIndex = `Column ${props.index + 1}`;

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const column = {
      name: event.target.value,
      updated: Date.now(),
    };
    dispatch(
      actions.editColumn({
        ...column,
        columnId: props.columnId,
      })
    );
    debouncedUpdateColumn(props.boardId, props.columnId, column);
  }

  function deleteColumn() {
    dispatch(
      actions.deleteColumn({
        boardId: props.boardId,
        columnId: props.columnId,
      })
    );
  }

  return (
    <Grid item xs={12} sm={3}>
      <Box marginBottom={2} position="relative">
        <TextField
          autoFocus={userEditingColumnId === props.columnId}
          fullWidth
          inputProps={{ 'aria-label': 'Column Name' }}
          placeholder={columnIndex}
          onChange={handleChange}
          value={column.name}
        />

        <Box position="absolute" right={0} top={0}>
          <CloseButton
            aria-label={`Delete column "${column.name || columnIndex}"`}
            onClick={deleteColumn}
            size="small"
          />
        </Box>
      </Box>

      <Items boardId={props.boardId} columnId={props.columnId} />
    </Grid>
  );
}
