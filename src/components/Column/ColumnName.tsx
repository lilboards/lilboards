import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import DeleteDialog from 'src/components/DeleteDialog';
import { DatabaseKey } from 'src/constants';
import { logEvent } from 'src/firebase';
import {
  useDispatch,
  useGetItemIds,
  useGetUserId,
  useIsAdmin,
  useIsEditing,
} from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

import CloseButton from '../CloseButton';

interface Props {
  boardId: Id;
  columnId: Id;
  name: string;
  placeholder: string;
}

export default function ColumnName(props: Props) {
  const dispatch = useDispatch();
  const isEditing = useIsEditing('columnId', props.columnId);
  const isAdmin = useIsAdmin(DatabaseKey.boards, props.boardId);
  const itemIds = useGetItemIds(DatabaseKey.columns, props.columnId);
  const userId = useGetUserId();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const columnName = props.name || props.placeholder;

  if (!isAdmin) {
    return (
      <Typography component="h2" gutterBottom variant="h5">
        {columnName}
      </Typography>
    );
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      actions.renameColumn({
        boardId: props.boardId,
        columnId: props.columnId,
        columnName: event.target.value,
        debounce: true,
        userId,
      }),
    );
  }

  function deleteColumn() {
    dispatch(
      actions.removeColumn({
        boardId: props.boardId,
        columnId: props.columnId,
      }),
    );
    itemIds.forEach((itemId) => {
      dispatch(
        actions.removeItem({
          boardId: props.boardId,
          itemId,
        }),
      );
      dispatch(
        actions.removeLikesItem({
          boardId: props.boardId,
          itemId,
        }),
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
        inputProps={{ 'aria-label': `Edit column “${columnName}”` }}
        placeholder={props.placeholder}
        onBlur={handleBlur}
        onChange={handleChange}
        value={props.name}
      />

      <CloseButton
        aria-label={`Delete column “${columnName}”`}
        onClick={() => setIsDialogOpen(true)}
        size="small"
        sx={{
          position: 'absolute',
          right: 4,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />

      <DeleteDialog
        content="This action cannot be undone."
        id={props.columnId}
        onClose={() => setIsDialogOpen(false)}
        onDelete={() => {
          deleteColumn();
          setIsDialogOpen(false);
        }}
        open={isDialogOpen}
        title={`Delete column “${columnName}”?`}
      />
    </>
  );
}
