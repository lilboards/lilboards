import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputBase from '@mui/material/InputBase';
import type { Theme } from '@mui/material/styles';
import Linkify from 'linkify-react';
import { useCallback } from 'react';
import { logEvent } from 'src/firebase';
import { useDispatch, useIsEditing, useItem, useUserId } from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

import Delete from './Delete';
import Likes from './Likes';

const textareaSx = {
  marginBottom: 1,
  marginTop: 1,
  minHeight: (theme: Theme) => theme.spacing(3),
};

interface Props {
  boardId: Id;
  cardStyle?: React.CSSProperties;
  columnId: Id;
  itemId: Id;
}

export default function Item(props: Props) {
  const { boardId, itemId } = props;
  const dispatch = useDispatch();
  const item = useItem(itemId);
  const isEditing = useIsEditing('itemId', itemId);
  const userId = useUserId();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        actions.updateItem({
          boardId,
          item: {
            text: event.target.value,
            updatedAt: Date.now(),
            updatedBy: userId,
          },
          itemId,
        }),
      );
    },
    [boardId, dispatch, itemId, userId],
  );

  const handleEdit = useCallback(() => {
    dispatch(actions.setUserEditing({ itemId }));
  }, [dispatch, itemId]);

  const handleFocus = useCallback(
    ({ target: textarea }: React.FocusEvent<HTMLTextAreaElement>) => {
      handleEdit();
      // set cursor at the end
      textarea.selectionStart = textarea.value.length;
    },
    [handleEdit],
  );

  const handleBlur = useCallback(() => {
    dispatch(actions.setUserEditing({ itemId: '' }));
    dispatch(
      actions.updateItem({
        boardId,
        item,
        itemId,
      }),
    );
    logEvent('update_item');
  }, [boardId, dispatch, item, itemId]);

  if (!item) {
    return null;
  }

  return (
    <Box position="relative">
      <Card raised={isEditing} style={props.cardStyle}>
        <Delete
          boardId={boardId}
          columnId={props.columnId}
          itemId={itemId}
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
          <Likes boardId={boardId} itemId={itemId} />
        </Box>
      </Card>
    </Box>
  );
}
