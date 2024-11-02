import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { logEvent } from 'src/firebase';
import {
  useDispatch,
  useGetUserId,
  useGetUserPhotoURL,
  useSelector,
} from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

import Checkbox from './Checkbox';
import Delete, { CLASSNAME_DELETE_ICON } from './Delete';

const CLASSNAME_DRAG_ICON = 'drag-icon';

interface Props {
  listId: Id;
  rowId: Id;
  itemId: Id;
}

export default function ListItem(props: Props) {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.listItems[props.itemId]);
  const isEditing = useSelector(
    (state) => state.user.editing.listItemId === props.itemId,
  );
  const userId = useGetUserId();
  const userPhotoURL = useGetUserPhotoURL();

  if (!item) {
    return null;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      actions.updateListItem({
        listId: props.listId,
        item: {
          text: event.target.value,
          updatedAt: Date.now(),
          updatedBy: userId,
        },
        itemId: props.itemId,
      }),
    );
  }

  function handleEdit() {
    dispatch(actions.setUserEditing({ listItemId: props.itemId }));
  }

  function handleFocus({
    target: textarea,
  }: React.FocusEvent<HTMLTextAreaElement>) {
    handleEdit();
    // set cursor at the end
    textarea.selectionStart = textarea.value.length;
  }

  function handleBlur() {
    dispatch(actions.setUserEditing({ listItemId: '' }));
    dispatch(
      actions.updateListItem({
        listId: props.listId,
        item,
        itemId: props.itemId,
      }),
    );
    logEvent('update_item');
  }

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        [`&:hover .${CLASSNAME_DRAG_ICON}`]: { visibility: 'visible' },
        [`&:hover .${CLASSNAME_DELETE_ICON}`]: { visibility: 'visible' },
      }}
    >
      <DragIndicatorIcon
        className={CLASSNAME_DRAG_ICON}
        color="disabled"
        fontSize="small"
        sx={{ cursor: 'grab', marginRight: 1, visibility: 'hidden' }}
      />

      <Checkbox {...props} />

      <TextField
        variant="standard"
        autoFocus={isEditing}
        fullWidth
        inputProps={{
          'aria-label': `Edit item “${item.text}”`,
          sx: {
            flexGrow: 1,
            textDecoration: item.checked ? 'line-through' : 'initial',
          },
        }}
        multiline
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder="Enter text..."
        value={item.text}
      />

      {userPhotoURL && item.createdBy === userId && (
        <Avatar
          alt="User Photo"
          src={userPhotoURL}
          sx={{ width: 24, height: 24 }}
        />
      )}

      <Delete
        listId={props.listId}
        rowId={props.rowId}
        itemId={props.itemId}
        itemText={item.text}
      />
    </Stack>
  );
}
