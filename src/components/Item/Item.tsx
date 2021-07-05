import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputBase from '@material-ui/core/InputBase';

import CloseButton from '../CloseButton';
import Likes from './Likes';

import actions from '../../actions';
import { useDispatch, useSelector } from '../../hooks';

import type { ChangeEvent } from 'react';
import type { Id } from '../../types';

type Props = {
  boardId: Id;
  columnId: Id;
  itemId: Id;
};

export default function Item(props: Props) {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.items[props.itemId]);
  const isEditing = useSelector(
    (state) => state.user.editing.itemId === props.itemId
  );

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
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(
      actions.updateItem({
        boardId: props.boardId,
        debounce: true,
        item: {
          text: event.target.value,
          updatedAt: Date.now(),
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
  }

  return (
    <Box height="100%" position="relative">
      <Card raised={isEditing}>
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
