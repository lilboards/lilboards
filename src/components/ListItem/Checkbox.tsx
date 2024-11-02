import Checkbox from '@mui/material/Checkbox';
import { useCallback } from 'react';
import { logEvent } from 'src/firebase';
import { useDispatch, useGetUserId, useSelector } from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

interface Props {
  listId: Id;
  rowId: Id;
  itemId: Id;
}

export default function ListItemCheckbox(props: Props) {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.listItems[props.itemId]);
  const userId = useGetUserId();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        actions.updateListItem({
          listId: props.listId,
          item: {
            checked: event.target.checked,
            updatedAt: Date.now(),
            updatedBy: userId,
          },
          itemId: props.itemId,
        }),
      );

      logEvent('check_item');
    },
    [dispatch, props, userId],
  );

  return (
    <Checkbox
      checked={Boolean(item.checked)}
      edge="start"
      inputProps={{ 'aria-label': `Check “${item.text}”` }}
      onChange={handleChange}
      size="small"
      sx={{ padding: 1 }}
    />
  );
}
