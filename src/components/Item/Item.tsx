import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputBase from '@mui/material/InputBase';
import type { ChangeEvent, CSSProperties } from 'react';

import { logEvent } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import { actions } from '../../store';
import type { Id } from '../../types';
import Delete from './Delete';
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

        <InputBase
          autoFocus={isEditing}
          components={{ Root: CardContent }}
          fullWidth
          inputProps={{
            'aria-label': `Edit item “${item.text}”`,
          }}
          multiline
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          value={item.text}
          sx={{
            marginTop: 1,
            marginBottom: 1,
          }}
        />

        <Box sx={{ position: 'absolute', bottom: 1, right: 0 }}>
          <Likes boardId={props.boardId} itemId={props.itemId} />
        </Box>
      </Card>
    </Box>
  );
}
