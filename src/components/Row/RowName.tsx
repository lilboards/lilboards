import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDispatch, useGetUserId, useSelector } from 'src/hooks';
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
  const isEditing = useSelector(
    (state) => state.user.editing.rowId === props.rowId,
  );
  const readOnly = useSelector(
    (state) => (state.lists[props.listId] || {}).createdBy !== state.user.id,
  );
  const userId = useGetUserId();
  const rowName = props.name || props.placeholder;

  if (readOnly) {
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
