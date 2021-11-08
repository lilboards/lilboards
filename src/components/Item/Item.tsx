import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputBase from '@mui/material/InputBase';
import type { ChangeEvent, CSSProperties } from 'react';

import actions from '../../actions';
import { firebaseAnalytics } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import type { Id } from '../../types';
import CloseButton from '../CloseButton';
import Likes from './Likes';

interface Props {
  boardId: Id;
  cardStyle?: CSSProperties;
  columnId: Id;
  itemId: Id;
}

export default function Item(props: Props) {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.items[props.itemId]);
  const isEditing = useSelector(
    (state) => state.user.editing.itemId === props.itemId
  );
  const userId = useSelector((state) => state.user.id);

  if (!item) {
    return null;
  }

  function deleteItem() {
    dispatch(
      actions.removeItem({
        boardId: props.boardId,
        itemId: props.itemId,
      })
    );
    dispatch(
      actions.removeColumnItemId({
        boardId: props.boardId,
        columnId: props.columnId,
        itemId: props.itemId,
      })
    );
    dispatch(
      actions.removeLikesItem({
        boardId: props.boardId,
        itemId: props.itemId,
      })
    );
    firebaseAnalytics.logEvent('delete_item');
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(
      actions.updateItem({
        boardId: props.boardId,
        item: {
          text: event.target.value,
          updatedAt: Date.now(),
          updatedBy: userId,
        },
        itemId: props.itemId,
        skipSave: true,
      })
    );
  }

  function handleFocus() {
    dispatch(actions.setUserEditing({ itemId: props.itemId }));
  }

  function handleBlur() {
    dispatch(actions.setUserEditing({ itemId: '' }));
    dispatch(
      actions.updateItem({
        boardId: props.boardId,
        item,
        itemId: props.itemId,
      })
    );
    firebaseAnalytics.logEvent('update_item');
  }

  return (
    <Box height="100%" position="relative">
      <Card raised={isEditing} style={props.cardStyle}>
        <Box position="absolute" right={0} top={0}>
          <CloseButton
            aria-label={`Delete item "${props.itemId}"`}
            onClick={deleteItem}
            size="small"
          />
        </Box>

        <Box component={CardContent} marginTop={1} marginBottom={1}>
          <InputBase
            autoFocus={isEditing}
            fullWidth
            inputProps={{ 'aria-label': `Edit item "${props.itemId}"` }}
            multiline
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            value={item.text}
          />
        </Box>

        <Box position="absolute" bottom={1} right={0}>
          <Likes boardId={props.boardId} itemId={props.itemId} />
        </Box>
      </Card>
    </Box>
  );
}
