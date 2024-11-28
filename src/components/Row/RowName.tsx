import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatabaseKey } from 'src/constants';
import { useDispatch, useIsAdmin, useIsEditing, useUserId } from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

interface Props {
  listId: Id;
  rowId: Id;
  name: string;
  placeholder: string;
}

export default function RowName(props: Props) {
  const dispatch = useDispatch();
  const isEditing = useIsEditing('rowId', props.rowId);
  const isAdmin = useIsAdmin(DatabaseKey.lists, props.listId);
  const userId = useUserId();
  const rowName = props.name || props.placeholder;

  if (!isAdmin) {
    return (
      <Typography component="h2" gutterBottom variant="h5">
        {rowName}
      </Typography>
    );
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    dispatch(
      actions.renameRow({
        listId: props.listId,
        rowId: props.rowId,
        rowName: event.target.value,
        debounce: true,
        userId,
      }),
    );
  }

  function handleBlur() {
    dispatch(actions.setUserEditing({ rowId: '' }));
  }

  return (
    <TextField
      autoFocus={isEditing}
      fullWidth
      inputProps={{
        'aria-label': `Edit row “${rowName}”`,
      }}
      placeholder={props.placeholder}
      onBlur={handleBlur}
      onChange={handleChange}
      value={props.name}
      variant="filled"
    />
  );
}
