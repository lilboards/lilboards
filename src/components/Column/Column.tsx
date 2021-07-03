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
  columnIndex: number;
};

export default function Column(props: Props) {
  const dispatch = useDispatch();
  const column = useSelector((state) => state.columns[props.columnId]);
  const isEditing = useSelector(
    (state) => state.user.editing.columnId === props.columnId
  );

  if (!column) {
    return null;
  }

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

  function handleBlur() {
    dispatch(actions.setUserEditing({ columnId: '' }));
  }

  const defaultName = `Column ${props.columnIndex + 1}`;

  return (
    <Grid item xs>
      <Box marginBottom={2} position="relative">
        <TextField
          autoFocus={isEditing}
          fullWidth
          inputProps={{ 'aria-label': 'Column Name' }}
          placeholder={defaultName}
          onBlur={handleBlur}
          onChange={handleChange}
          value={column.name}
        />

        <Box position="absolute" right={0} top={0}>
          <CloseButton
            aria-label={`Delete column "${column.name || defaultName}"`}
            onClick={deleteColumn}
            size="small"
          />
        </Box>
      </Box>

      <Items boardId={props.boardId} columnId={props.columnId} />
    </Grid>
  );
}
