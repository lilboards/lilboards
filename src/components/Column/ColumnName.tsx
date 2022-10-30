import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { ChangeEvent } from 'react';

import actions from '../../actions';
import { logEvent } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import type { Id } from '../../types';
import CloseButton from '../CloseButton';

type Props = {
  boardId: Id;
  columnId: Id;
  name: string;
  placeholder: string;
};

export default function ColumnName(props: Props) {
  const dispatch = useDispatch();
  const isEditing = useSelector(
    (state) => state.user.editing.columnId === props.columnId
  );
  const readOnly = useSelector(
    (state) => (state.boards[props.boardId] || {}).createdBy !== state.user.id
  );
  const itemIds = useSelector(
    (state) => (state.columns[props.columnId] || {}).itemIds || []
  );
  const userId = useSelector((state) => state.user.id);

  if (readOnly) {
    return (
      <Typography component="h2" gutterBottom variant="h5">
        {props.name || props.placeholder}
      </Typography>
    );
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    dispatch(
      actions.renameColumn({
        boardId: props.boardId,
        columnId: props.columnId,
        columnName: event.target.value,
        debounce: true,
        userId,
      })
    );
  }

  function deleteColumn() {
    dispatch(
      actions.removeColumn({
        boardId: props.boardId,
        columnId: props.columnId,
      })
    );
    itemIds.forEach((itemId) => {
      dispatch(
        actions.removeItem({
          boardId: props.boardId,
          itemId,
        })
      );
      dispatch(
        actions.removeLikesItem({
          boardId: props.boardId,
          itemId,
        })
      );
    });
    logEvent('delete_column');
  }

  function handleBlur() {
    dispatch(actions.setUserEditing({ columnId: '' }));
  }

  return (
    <>
      <TextField
        autoFocus={isEditing}
        fullWidth
        inputProps={{ 'aria-label': 'Column Name' }}
        placeholder={props.placeholder}
        onBlur={handleBlur}
        onChange={handleChange}
        value={props.name}
      />

      <CloseButton
        aria-label={`Delete column "${props.name || props.placeholder}"`}
        onClick={deleteColumn}
        size="small"
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      />
    </>
  );
}
