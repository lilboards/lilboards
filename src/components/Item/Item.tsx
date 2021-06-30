import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputBase from '@material-ui/core/InputBase';

import CloseButton from '../CloseButton';
import Likes from './Likes';

import actions from '../../actions';
import { debouncedUpdateItem } from '../../firebase';
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
  const userEditingItemId = useSelector((state) => state.user.editing.itemId);

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
    const item = {
      text: event.target.value,
      updated: Date.now(),
    };
    dispatch(
      actions.updateItem({
        ...item,
        itemId: props.itemId,
      })
    );
    debouncedUpdateItem(props.boardId, props.itemId, item);
  }

  function handleFocus() {
    dispatch(actions.setUserEditing({ itemId: props.itemId }));
  }

  function handleBlur() {
    dispatch(actions.setUserEditing({ itemId: '' }));
  }

  return (
    <Box height="100%" position="relative">
      <Card>
        <Box position="absolute" right={0} top={0}>
          <CloseButton
            aria-label={`Delete item "${props.itemId}"`}
            onClick={deleteItem}
            size="small"
          />
        </Box>

        <Box component={CardContent} marginTop={1} marginBottom={1}>
          <InputBase
            autoFocus={props.itemId === userEditingItemId}
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
