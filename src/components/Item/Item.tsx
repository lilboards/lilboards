import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputBase from '@mui/material/InputBase';
import type { Theme } from '@mui/material/styles';
import Linkify from 'linkify-react';
import { logEvent } from 'src/firebase';
import {
  useDispatch,
  useGetUserId,
  useIsEditing,
  useSelector,
} from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

import Delete from './Delete';
import Likes from './Likes';

const textareaSx = {
  minHeight: (theme: Theme) => theme.spacing(3),
  marginTop: 1,
  marginBottom: 1,
};

interface Props {
  boardId: Id;
  cardStyle?: React.CSSProperties;
  columnId: Id;
  itemId: Id;
}

export default function Item(props: Props) {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.items[props.itemId]);
  const isEditing = useIsEditing('itemId', props.itemId);
  const userId = useGetUserId();

  if (!item) {
    return null;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      actions.updateItem({
        boardId: props.boardId,
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
    dispatch(actions.setUserEditing({ itemId: props.itemId }));
  }

  function handleFocus({
    target: textarea,
  }: React.FocusEvent<HTMLTextAreaElement>) {
    handleEdit();
    // set cursor at the end
    textarea.selectionStart = textarea.value.length;
  }

  function handleBlur() {
    dispatch(actions.setUserEditing({ itemId: '' }));
    dispatch(
      actions.updateItem({
        boardId: props.boardId,
        item,
        itemId: props.itemId,
      }),
    );
    logEvent('update_item');
  }

  return (
    <Box height="100%" position="relative">
      <Card raised={isEditing} style={props.cardStyle}>
        <Delete
          boardId={props.boardId}
          columnId={props.columnId}
          itemId={props.itemId}
          itemText={item.text}
        />

        {isEditing ? (
          <InputBase
            autoFocus={isEditing}
            fullWidth
            inputProps={{
              'aria-label': `Edit item “${item.text}”`,
              sx: textareaSx,
            }}
            multiline
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            slots={{ root: CardContent }}
            value={item.text}
          />
        ) : (
          <Linkify
            options={{
              nl2br: true,
              rel: 'noopener noreferrer',
              target: '_blank',
            }}
          >
            <CardContent
              aria-label={`Edit item “${item.text}”`}
              aria-multiline
              onClick={handleEdit}
              role="textbox"
            >
              <Box sx={textareaSx}>{item.text}</Box>
            </CardContent>
          </Linkify>
        )}

        <Box sx={{ position: 'absolute', bottom: 1, right: 0 }}>
          <Likes boardId={props.boardId} itemId={props.itemId} />
        </Box>
      </Card>
    </Box>
  );
}
